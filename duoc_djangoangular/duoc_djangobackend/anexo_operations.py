import pandas as pd
from .models import *
from .views import *
from datetime import datetime
from typing import Dict
from django.db.models import Sum
from django.db.models.functions import ExtractMonth
def create_calculo_name(nombre):
    """funcion reutilizable que crea el nombre del calculo mensual en español y lo retorna para que sea usable en el modelo
    Returns: nombre_calculo (str): Nombre del calculo mensual
    """
    #crea diccionario de nombres de mes en espanol
    month_names = {
    'January': 'Enero',
    'February': 'Febrero',
    'March': 'Marzo',
    'April': 'Abril',
    'May': 'Mayo',
    'June': 'Junio',
    'July': 'Julio',
    'August': 'Agosto',
    'September': 'Septiembre',
    'October': 'Octubre',
    'November': 'Noviembre',
    'December': 'Diciembre'
    }
    #obtiene el mes y año actual
    month_name = datetime.now().strftime("%B")
    year = datetime.now().strftime("%Y")
    mes = month_names[month_name]
    #crea el nombre del calculo mensual
    nombre_calculo = f"Calculo_{nombre}_{mes}_{year}"
    
    return nombre_calculo
def process_anexo(id_facultad, id_unidad, id_anexo, file):
    """
    Funcion que procesa Anexo insertado por el usuario
    Args: id_facultad (int): Id de la facultad a la que pertenece el anexo.
          id_unidad (int): Id de la unidad a la que pertenece el anexo.
          id_anexo (int): Id del anexo.
          file (File): Archivo del anexo.
    """
    # Leer archivo excel en un dataframe.
    df = pd.read_excel(file)
    # Iteracion de filas del dataframe.
    try:
        for index, row in df.iterrows():
            # Perform an upsert operation
            registro, created = RegistroLlamada.objects.update_or_create(
                # Set the lookup parameters here
                id_anexo=id_anexo,
                nombre_proveedor=row["nombre_proveedor"],
                numero_telefono=row["numero_telefono"],
                fecha_llamada=row["fecha_llamada"],
                defaults={
                    # Set the fields you want to update here
                    'id_facultad': id_facultad,
                    'id_unidad': id_unidad,
                    'tipo_llamada_siglas': row["tipo_llamada_siglas"],
                    'hora_llamada': row["hora_llamada"],
                    'duracion_llamada': row["duracion_llamada"],
                    'tipo_respuesta': row["tipo_respuesta"],
                    'siglas_facultad': row["siglas_facultad"],
                    'siglas_depto': row["siglas_depto"],
                    'nombre_destinatario': row["nombre_destinatario"],
                }
            )
    except Exception as e:
        error_message = f"al procesar anexo: {e}"
        raise Exception(error_message)
        
#Reprocess Anexo
def reprocess_anexo(id_anexo):
    """
    Busca un los registros de un anexo en la base de datos, borra todos los registros correspondientes y los procesa denuevo con la funcion process_anexo
    Args: id_anexo
    """
    try:
        #Busqueda de registros donde el id del anexo coincide
        registros = RegistroLlamada.objects.filter(id_anexo=id_anexo)
        #Borrar todos los registros del anexo
        registros.delete()
    except Exception as e:
        error_message = f"al borrar registros de anexo: {e}"
        raise Exception(error_message)
    #Busqueda de anexo en la base de datos
    anexo = Anexo.objects.get(id_anexo=id_anexo)
    #Procesar anexo con la funcion process_anexo
    process_anexo(anexo.id_facultad, anexo.id_unidad, anexo.id_anexo, anexo.file)
# Calcular tarificacion Mensual por unidad.
def calculo_mensual_unidad (id_anexo):
    """Funcion que calcula la tarificacion mensual por unidad.
    Args: id_anexo (int): Id del anexo.(cada anexo tiene una unica id_unidad y id_facultad, por lo que toda la info del respectivo anexo corresponde a una unidad y facultad en cuestion)
    """
    #Busqueda de registros donde el id del anexo coincide
    registros = RegistroLlamada.objects.filter(id_anexo=id_anexo)
    #inicializar costo_total
    costo_total_cel = 0
    costo_total_ldi = 0
    costo_total_slm = 0
    #obtener nombre de proveedor del documento
    nombre_proveedor = registros[0].nombre_proveedor
    #consultar precio por segundo de cada tipo de llamada en base al proveedor
    proveedor = ProveedoresTelefonia.objects.get(nombre_proveedor=nombre_proveedor)
    costo_seg_cel = proveedor.costo_seg_cel
    costo_seg_ldi = proveedor.costo_seg_ldi
    costo_seg_slm = proveedor.costo_seg_slm
    #iteracion de registros
    for registro in registros:
        #obtener el tipo de llamada y su duracion de la coleccion registro.
        tipo_llamada = registro.tipo_llamada_siglas
        duracion_llamada = registro.duracion_llamada
        #calcular precio y anadirlo al total en base al tipo de llamada
        if tipo_llamada == "CEL":
            costo_total_cel += duracion_llamada * costo_seg_cel
        elif tipo_llamada == "LDI":
            costo_total_ldi += duracion_llamada * costo_seg_ldi
        elif tipo_llamada == "SLM":
            costo_total_slm += duracion_llamada * costo_seg_slm
    #Obtener id_facultad y id_unidad desde el RegistroLlamada
    id_facultad = registros[0].id_facultad
    id_unidad = registros[0].id_unidad
    #Consultar colleccion unidad para obtener nombre_depto
    unidad = Unidad.objects.get(id_unidad=id_unidad)
    nombre_depto = unidad.nombre_depto
    # Crea nombre leeible
    calculo_nombre = create_calculo_name(nombre_depto)
    #Crear nuevo calculo_mensual
    calculo_mensual = CalculoMensualUnidad(
        id_facultad = id_facultad,
        nombre_calculo = calculo_nombre,
        nombre_depto = nombre_depto,
        tarificacion_general = costo_total_cel + costo_total_ldi + costo_total_slm,
        tarificacion_slm = costo_total_slm,
        tarificacion_cel = costo_total_cel,
        tarificacion_ldi = costo_total_ldi,
    )
    #Guardar calculo_mensual en la base de datos
    calculo_mensual.save()
# Calcular tarificacion Mensual general por facultad.


def calculo_mensual_general(mes:int, id_facultad:int) -> None:
    """
        Calcula el monto general en base a los calculos mensuales de cada unidad de la facultad.
        Args: mes (int): Mes de calculo, id_facultad (int): Id de la facultad a la que pertenece el anexo.
    """
    #Consulta la BD por instancias de CalculoUnidad donde coincida la facultad y el mes en fecha_calculo y se agregan sus valores
    calculos = CalculoMensualUnidad.objects.filter(id_facultad=id_facultad)
    #inicializar costo_total
    costo_total_general = 0
    costo_total_cel = 0
    costo_total_ldi = 0
    costo_total_slm = 0
    #iteracion de calculos
    for calculo in calculos:
        #extraer el mes actual del registro en formato int
        mes_actual = calculo.fecha_calculo.month
        #si el mes_actual coincide con mes se agregan los valores si no se procede al siguiente registro
        if mes_actual == mes:
            costo_total_general += calculo.tarificacion_general
            costo_total_cel += calculo.tarificacion_cel
            costo_total_ldi += calculo.tarificacion_ldi
            costo_total_slm += calculo.tarificacion_slm
        else:
            continue
    #Obtener nombre_facultad desde CuentaPresupuestaria
    facultad = CuentaPresupuestaria.objects.get(id_facultad=id_facultad)
    nombre_facultad = facultad.nombre_facultad
    # Crea nombre leeible
    calculo_nombre = create_calculo_name(nombre_facultad)
    #Crear nuevo calculo_mensual_general
    calculo_mensual_general = CalculoMensualFacultad(
        id_facultad = id_facultad,
        nombre_calculo = calculo_nombre,
        nombre_facultad = nombre_facultad,
        tarificacion_general = costo_total_general,
        tarificacion_slm = costo_total_slm,
        tarificacion_cel = costo_total_cel,
        tarificacion_ldi = costo_total_ldi,
    )
    #Guardar calculo_mensual_general en la base de datos
    calculo_mensual_general.save()