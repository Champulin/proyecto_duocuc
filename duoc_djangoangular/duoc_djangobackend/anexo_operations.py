import pandas as pd
from .models import *
from .views import *
from datetime import datetime

# from weasyprint import HTML
from django.http import FileResponse
import os
import tempfile
from bson.objectid import ObjectId


def create_calculo_name(name: str, month: int = None):
    """Función re-utilizable que crea el nombre del calculo mensual en español y lo retorna para que sea usable en el modelo
    Returns: nombre_calculo (str): Nombre del calculo mensual
    """
    # crea diccionario de nombres de mes en espanol
    month_names = {
        1: "Enero",
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre",
    }
    # obtiene el mes y año actual
    month_name = month_names[month]
    year = datetime.now().strftime("%Y")
    # crea el nombre del calculo mensual
    nombre_calculo = f"Calculo_{name}_{month_name}_{year}"

    return nombre_calculo


def month_number_to_name(num: int):
    month_names = {
        1: "Enero",
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre",
    }
    month_name = month_names[num]
    date = f"{month_name}"
    return date


def generate_report_name(nombre: str, num: int):
    month_name = month_number_to_name(num)
    year = datetime.now().strftime("%Y")
    report_name = f"Reporte_{nombre}_{month_name}_{year}"
    return report_name


def process_anexo(id_facultad, id_unidad, id_anexo, file):
    """
    Función que procesa Anexo insertado por el usuario
    Args: id_facultad (int): Id de la facultad a la que pertenece el anexo.
          id_unidad (int): Id de la unidad a la que pertenece el anexo.
          id_anexo (int): Id del anexo.
          file (File): Archivo del anexo.
    """
    # Leer archivo excel en un dataframe.
    df = pd.read_excel(file)
    # Iteración de filas del dataframe.
    try:
        for index, row in df.iterrows():
            # Perform Upsert
            registro, created = RegistroLlamada.objects.update_or_create(
                # Filtros de Search
                id_anexo=id_anexo,
                nombre_proveedor=row["nombre_proveedor"],
                numero_telefono=row["numero_telefono"],
                fecha_llamada=row["fecha_llamada"],
                defaults={
                    # Campos a cambiar
                    "id_facultad": id_facultad,
                    "id_unidad": id_unidad,
                    "tipo_llamada_siglas": row["tipo_llamada_siglas"],
                    "hora_llamada": row["hora_llamada"],
                    "duracion_llamada": row["duracion_llamada"],
                    "tipo_respuesta": row["tipo_respuesta"],
                    "siglas_facultad": row["siglas_facultad"],
                    "siglas_depto": row["siglas_depto"],
                    "nombre_destinatario": row["nombre_destinatario"],
                },
            )
    except Exception as e:
        error_message = f"al procesar anexo: {e}"
        raise Exception(error_message)


# Reprocess Anexo
def reprocess_anexo(id_anexo):
    """
    Busca un los registros de un anexo en la base de datos, borra todos los registros correspondientes y los procesa de nuevo con la function process_anexo
    Args: id_anexo
    """
    try:
        # Busqueda de registros donde el id del anexo coincide
        registros = RegistroLlamada.objects.filter(id_anexo=id_anexo)
        # Borrar todos los registros del anexo
        registros.delete()
    except Exception as e:
        error_message = f"al borrar registros de anexo: {e}"
        raise Exception(error_message)
    # Busqueda de anexo en la base de datos
    anexo = Anexo.objects.get(id_anexo=id_anexo)
    # Procesar anexo con la function process_anexo
    process_anexo(anexo.id_facultad, anexo.id_unidad, anexo.id_anexo, anexo.file)


# Calcular tarificacion Mensual por unidad.
def calculo_mensual_unidad(id_anexo, mes):
    """Function que calcula la tarificacion mensual por unidad.
    Args: id_anexo (int): Id del anexo.(cada anexo tiene una unica id_unidad y id_facultad, por lo que toda la info del respectivo anexo corresponde a una unidad y facultad)
    """
    # Busqueda de registros donde el id del anexo coincide
    registros = RegistroLlamada.objects.filter(id_anexo=id_anexo)
    # inicializar costo_total
    costo_total_cel = 0
    costo_total_ldi = 0
    costo_total_slm = 0
    duracion_total_cel = 0
    duracion_total_ldi = 0
    duracion_total_slm = 0
    duracion_total_general = 0
    # obtener nombre de proveedor del documento
    nombre_proveedor = registros[0].nombre_proveedor
    # consultar precio por segundo de cada tipo de llamada en base al proveedor
    proveedor = ProveedoresTelefonia.objects.get(nombre_proveedor=nombre_proveedor)
    costo_seg_cel = proveedor.costo_seg_cel
    costo_seg_ldi = proveedor.costo_seg_ldi
    costo_seg_slm = proveedor.costo_seg_slm
    # iteracion de registros
    for registro in registros:
        # obtener el tipo de llamada y su duracion de la collection registro.
        tipo_llamada = registro.tipo_llamada_siglas
        duracion_llamada = registro.duracion_llamada
        # calcular precio y agregarlo al total en base al tipo de llamada
        if tipo_llamada == "CEL":
            costo_total_cel += duracion_llamada * costo_seg_cel
            duracion_total_cel += duracion_llamada
            duracion_total_general += duracion_llamada
        elif tipo_llamada == "LDI":
            costo_total_ldi += duracion_llamada * costo_seg_ldi
            duracion_total_ldi += duracion_llamada
            duracion_total_general += duracion_llamada
        elif tipo_llamada == "SLM":
            costo_total_slm += duracion_llamada * costo_seg_slm
            duracion_total_slm += duracion_llamada
            duracion_total_general += duracion_llamada
    # Obtener id_facultad y id_unidad desde el RegistroLlamada
    id_facultad = registros[0].id_facultad
    id_unidad = registros[0].id_unidad
    # Consultar collection unidad para obtener nombre_depto
    unidad = Unidad.objects.get(id_unidad=id_unidad)
    nombre_depto = unidad.nombre_depto
    # Crea nombre readable
    print("llegue a poner el nombre")
    calculo_nombre = create_calculo_name(nombre_depto, mes)
    # Crear nuevo calculo_mensual o updatear uno existente
    calculo_general = CalculoMensualUnidad.objects.filter(
        id_facultad=id_facultad, id_unidad=id_unidad, nombre_calculo=calculo_nombre
    )
    if calculo_general.exists():
        calculo_general.update(
            tarificacion_general=costo_total_cel + costo_total_ldi + costo_total_slm,
            tarificacion_slm=costo_total_slm,
            tarificacion_cel=costo_total_cel,
            tarificacion_ldi=costo_total_ldi,
            cant_segundos_total=duracion_total_general,
            cant_segundos_slm=duracion_total_cel,
            cant_segundos_ldi=duracion_total_ldi,
            cant_segundos_cel=duracion_total_slm,
        )
    else:
        calculo_mensual = CalculoMensualUnidad(
            id_facultad=id_facultad,
            id_unidad=id_unidad,
            nombre_calculo=calculo_nombre,
            nombre_depto=nombre_depto,
            tarificacion_general=costo_total_cel + costo_total_ldi + costo_total_slm,
            tarificacion_slm=costo_total_slm,
            tarificacion_cel=costo_total_cel,
            tarificacion_ldi=costo_total_ldi,
            cant_segundos_total=duracion_total_general,
            cant_segundos_slm=duracion_total_cel,
            cant_segundos_ldi=duracion_total_ldi,
            cant_segundos_cel=duracion_total_slm,
        )
        calculo_mensual.save()


# Calcular tarificacion Mensual general por facultad.


def calculo_mensual_general(mes: int, id_facultad: int) -> None:
    """
    Calcula el monto general en base a los calculos mensuales de cada unidad de la facultad.
    Args: mes (int): Mes de calculo, id_facultad (int): Id de la facultad a la que pertenece el anexo.
    """
    # Consulta la BD por instancias de CalculoUnidad donde coincida la facultad y el mes en fecha_calculo y se agregan sus valores
    calculos = CalculoMensualUnidad.objects.filter(id_facultad=id_facultad)
    registros = RegistroLlamada.objects.filter(id_facultad=id_facultad)
    # Obtener el mes actual
    mes_calculos = mes - 1
    for registro in registros:
        if registro.fecha_llamada.month == mes_calculos:
            mes_actual = registro.fecha_llamada.month
            break
        else:
            continue
    # inicializar costo_total
    costo_total_general = 0
    costo_total_cel = 0
    costo_total_ldi = 0
    costo_total_slm = 0
    duracion_total_general = 0
    duracion_total_cel = 0
    duracion_total_ldi = 0
    duracion_total_slm = 0
    # iteracion de calculos
    for calculo in calculos:
        # extraer el mes actual del registro en formato int
        # si el mes_actual coincide con mes se agregan los valores si no se procede al siguiente registro
        if mes_actual == mes_calculos:
            costo_total_general += calculo.tarificacion_general
            costo_total_cel += calculo.tarificacion_cel
            costo_total_ldi += calculo.tarificacion_ldi
            costo_total_slm += calculo.tarificacion_slm
            duracion_total_general += calculo.cant_segundos_total
            duracion_total_cel += calculo.cant_segundos_cel
            duracion_total_ldi += calculo.cant_segundos_ldi
            duracion_total_slm += calculo.cant_segundos_slm
        else:
            continue
    # Obtener nombre_facultad desde CuentaPresupuestaria
    facultad = CuentaPresupuestaria.objects.get(id_facultad=id_facultad)
    nombre_facultad = facultad.nombre_facultad
    # Crea nombre readable
    calculo_nombre = create_calculo_name(nombre_facultad, mes)
    # Crear nuevo calculo_mensual_general o updatear si existe
    calculo_general = CalculoMensualFacultad.objects.filter(
        id_facultad=id_facultad, nombre_calculo=calculo_nombre
    )
    if calculo_general.exists():
        calculo_general.update(
            cant_segundos_total=duracion_total_general,
            cant_segundos_slm=duracion_total_cel,
            cant_segundos_ldi=duracion_total_ldi,
            cant_segundos_cel=duracion_total_slm,
            tarificacion_general=costo_total_general,
            tarificacion_slm=costo_total_slm,
            tarificacion_cel=costo_total_cel,
            tarificacion_ldi=costo_total_ldi,
        )
    else:
        calculo_mensual_general = CalculoMensualFacultad(
            id_facultad=id_facultad,
            nombre_calculo=calculo_nombre,
            nombre_facultad=nombre_facultad,
            cant_segundos_total=duracion_total_general,
            cant_segundos_slm=duracion_total_cel,
            cant_segundos_ldi=duracion_total_ldi,
            cant_segundos_cel=duracion_total_slm,
            tarificacion_general=costo_total_general,
            tarificacion_slm=costo_total_slm,
            tarificacion_cel=costo_total_cel,
            tarificacion_ldi=costo_total_ldi,
        )
        # Guardar calculo_mensual_general en la base de datos
        calculo_mensual_general.save()


def consultar_trafico_llamada(nombre_proveedor: str, mes: int):
    """
    Consulta el trafico de llamadas de un proveedor en la base de datos.
    Args: nombre_proveedor (String): Nombre del proveedor a consultar, mes (int): Mes de consulta.
    returns: trafico_llamadas (dict): Diccionario con el trafico de llamadas del proveedor.
    """
    # Consulta la BD por instancias de RegistroLlamada donde coincida el nombre del proveedor
    registros = RegistroLlamada.objects.filter(nombre_proveedor=nombre_proveedor)
    # inicializar costo_total y duracion_total
    costo_total_general = 0
    costo_total_cel = 0
    costo_total_ldi = 0
    costo_total_slm = 0
    duracion_total_general = 0
    duracion_total_cel = 0
    duracion_total_ldi = 0
    duracion_total_slm = 0
    mes_actual = mes - 1
    # iteracion de registros
    for registro in registros:
        # extraer el tipo_llamada y duracion_llamada del registro
        tipo_llamada = registro.tipo_llamada_siglas
        proveedor_telefonia = ProveedoresTelefonia.objects.get(
            nombre_proveedor=registro.nombre_proveedor
        )
        duracion_llamada = registro.duracion_llamada
        if mes_actual == registro.fecha_llamada.month:
            # si el tipo_llamada coincide con el tipo de llamada se agregan los valores si no se procede al siguiente registro
            if tipo_llamada == "CEL":
                costo_total_cel += duracion_llamada * proveedor_telefonia.costo_seg_cel
                duracion_total_cel += duracion_llamada
                duracion_total_general += duracion_llamada
            elif tipo_llamada == "LDI":
                costo_total_ldi += duracion_llamada * proveedor_telefonia.costo_seg_ldi
                duracion_total_ldi += duracion_llamada
                duracion_total_general += duracion_llamada
            elif tipo_llamada == "SLM":
                costo_total_slm += duracion_llamada * proveedor_telefonia.costo_seg_slm
                duracion_total_slm += duracion_llamada
                duracion_total_general += duracion_llamada
            else:
                continue
        else:
            continue
    costo_total_general = costo_total_cel + costo_total_ldi + costo_total_slm
    response_data = {
        "costo_total_general": costo_total_general,
        "costo_total_cel": costo_total_cel,
        "costo_total_ldi": costo_total_ldi,
        "costo_total_slm": costo_total_slm,
        "duracion_total_general": duracion_total_general,
        "duracion_total_cel": duracion_total_cel,
        "duracion_total_ldi": duracion_total_ldi,
        "duracion_total_slm": duracion_total_slm,
    }
    return response_data


def generate_csv(nombre, mes, tipo_reporte, object_id):
    """Genera un archivo csv con el reporte solicitado
    Args: nombre (str): Nombre de la facultad o departamento, mes (int): Mes del reporte, tipo_reporte (str): Tipo de reporte a generar
    Returns: Response: Response con el archivo a descargar
    """
    if tipo_reporte == "unidad":
        calculo_mensual = CalculoMensualUnidad.objects.get(_id=ObjectId(object_id))
        facultad = CuentaPresupuestaria.objects.get(
            id_facultad=calculo_mensual.id_facultad
        )
        if mes == calculo_mensual.fecha_calculo.month:
            # Crear dataframe con data de calculo_mensual
            nombre_facultad = facultad.nombre_facultad
            data = {
                "nombre_facultad": [nombre_facultad],
                "nombre_depto": [calculo_mensual.nombre_depto],
                "fecha_calculo": [calculo_mensual.fecha_calculo.strftime("%d/%m/%Y")],
                "cantidad_segundos_total": [calculo_mensual.cant_segundos_total],
                "cantidad_segundos_cel": [calculo_mensual.cant_segundos_cel],
                "cantidad_segundos_ldi": [calculo_mensual.cant_segundos_ldi],
                "cantidad_segundos_slm": [calculo_mensual.cant_segundos_slm],
                "tarificacion_total": [calculo_mensual.tarificacion_general],
                "tarificacion_cel": [calculo_mensual.tarificacion_cel],
                "tarificacion_ldi": [calculo_mensual.tarificacion_ldi],
                "tarificacion_slm": [calculo_mensual.tarificacion_slm],
            }
            df = pd.DataFrame(data)
            nombre_archivo = generate_report_name(calculo_mensual.nombre_depto, mes)
        else:
            raise Exception("No existen registros para el mes seleccionado")
    elif tipo_reporte == "facultad":
        calculo_mensual = CalculoMensualFacultad.objects.get(nombre_facultad=nombre)
        if mes == calculo_mensual.fecha_calculo.month:
            # Crear dataframe con data de calculo_mensual
            data = {
                "nombre_facultad": [calculo_mensual.nombre_facultad],
                "fecha_calculo": [calculo_mensual.fecha_calculo.strftime("%d/%m/%Y")],
                "cantidad_segundos_total": [calculo_mensual.cant_segundos_total],
                "cantidad_segundos_cel": [calculo_mensual.cant_segundos_cel],
                "cantidad_segundos_ldi": [calculo_mensual.cant_segundos_ldi],
                "cantidad_segundos_slm": [calculo_mensual.cant_segundos_slm],
                "tarificacion_total": [calculo_mensual.tarificacion_general],
                "tarificacion_cel": [calculo_mensual.tarificacion_cel],
                "tarificacion_ldi": [calculo_mensual.tarificacion_ldi],
                "tarificacion_slm": [calculo_mensual.tarificacion_slm],
            }
            df = pd.DataFrame(data)
            nombre_archivo = generate_report_name(calculo_mensual.nombre_facultad, mes)
        else:
            raise Exception("No existen registros para el mes seleccionado")
    else:
        raise Exception("El request no corresponde a unidad o facultad")
    # Guardar Excel a file
    with tempfile.NamedTemporaryFile(
        dir="duoc_djangobackend/media/reportes", suffix=".csv", delete=False
    ) as temp_file:
        # Escribir la data del CSV a un temp file
        df.to_csv(path_or_buf=temp_file, sep=";", index=False)
        temp_file_path = temp_file.name
    # Retornar el CSV como un response
    response = FileResponse(open(temp_file_path, "rb"), content_type="text/csv")
    response["Content-Disposition"] = f'attachment; filename="{nombre_archivo}.csv"'
    return response


def delete_all_files(file_path):
    import glob

    for file_path in glob.glob(f"{file_path}/*"):
        os.remove(file_path)
