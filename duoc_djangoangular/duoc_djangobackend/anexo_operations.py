import pandas as pd
from pymongo import MongoClient
from django.conf import settings
from .models import *
from .views import *


def process_anexo(id_facultad, id_unidad, id_anexo, file):
    """
    Funcion que procesa Anexo insertado por el usuario
    Args: id_facultad (int): Id de la facultad a la que pertenece el anexo.
          id_unidad (int): Id de la unidad a la que pertenece el anexo.
          id_anexo (int): Id del anexo.
          file (File): Archivo del anexo.
    *!NO SE AUN SI SE USARA UN ANEXO GENERAL QUE INSERTA A TODAS LAS FACULTADES/UNIDADES EN BASE A SU INFORMACION O SI ES UN ANEXO POR UNIDAD (POR ENDE FACULTAD TAMBIEN),
    *!HAY QUE CONVERSAR CON ARTURO
    """
    # Leer archivo excel en un dataframe.
    df = pd.read_excel(file)
    # Iteracion de filas del dataframe.
    for index, row in df.iterrows():
        # Creacion de nuevo objeto RegistroLlamada. por cada fila del dataframe.
        registro = RegistroLlamada(
            id_anexo=id_anexo,
            id_facultad=id_facultad,
            id_unidad=id_unidad,
            nombre_proveedor=row["nombre_proveedor"],
            tipo_llamada_siglas=row["tipo_llamada_siglas"],
            numero_telefono=row["numero_telefono"],
            fecha_llamada=row["fecha_llamada"],
            hora_llamada=row["hora_llamada"],
            duracion_llamada=row["duracion_llamada"],
            tipo_respuesta=row["tipo_respuesta"],
            siglas_facultad=row["siglas_facultad"],
            siglas_depto=row["siglas_depto"],
            nombre_destinatario=row["nombre_destinatario"],
        )
        # Guardar registro en la base de datos.
        registro.save()


# Calcular tarificacion Mensual por unidad.
def calculo_mensual_unidad(mes, id_anexo):
    """Funcion que calcula la tarificacion mensual por unidad.
    Args: mes (int): Mes de la tarificacion.
        id_anexo (int): Id del anexo.(cada anexo tiene una unica id_unidad y id_facultad, por lo que toda la info del respectivo anexo corresponde a una unidad y facultad en cuestion)
    Returns: calculo_mensual (int) valor de la tarificacion mensual.
    """
    # Conexion a database usando la data de settings.py
    client = MongoClient(settings.MONGO_DB_URI)
    db = client[settings.MONGO_DB_NAME]
    # Obtener la data de la coleccion RegistroLlamada para el id_anexo respectivo
    registros = db["RegistroLlamada"].find({"id_anexo": id_anexo})
    # Calcula la duracion total del mes en minutos y su costo asociado.


# Calcular tarificacion Mensual general por facultad.
