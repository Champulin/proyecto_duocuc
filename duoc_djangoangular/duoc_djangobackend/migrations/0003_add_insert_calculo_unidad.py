# Generated by Django 4.1.8 on 2023-05-16 14:32
# Generated by Django 4.1.8 on 2023-05-10 00:45

from django.db import migrations
from django.core.files import File
from ..anexo_operations import process_anexo,calculo_mensual_unidad
import os


def crear_anexo_y_procesar(apps, schema_editor):
    Anexo = apps.get_model('duoc_djangobackend', 'Anexo')
    #Crear un anexo
    # Path to the initial anexo file
    initial_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'static', 'anexo_pruebas_1.xlsx')
    print(f'initial_file_path: {initial_file_path}')
    try:
        # Create the Anexo object
        anexo, _ = Anexo.objects.update_or_create(
            id_anexo=1,
            defaults={
                'id_unidad': 1,
                'id_facultad': 1,
                'nombre_anexo': 'Asignacion Abril Ingenieria',
            }
        )
        # Save the file
        with open(initial_file_path, 'rb') as excel:
            anexo.file.save('anexo_pruebas_1.xlsx', File(excel))
        print('anexo creado con exito')
    except Exception as e:
        print(f'Error al abrir el archivo: {e}')
        exit(1)
    #procesar el anexo
    try:
        process_anexo(anexo.id_facultad, anexo.id_unidad,anexo.id_anexo,anexo.file)
        print('anexo procesado con exito')
    except Exception as e:
        print(f'Error al procesar el anexo: {e}')
        exit(1)
    #calcular el mensual de la unidad
    try:
        calculo_mensual_unidad(anexo.id_anexo)
    except Exception as e:
        print(f'Error al calcular el mensual de la unidad: {e}')
        exit(1)
class Migration(migrations.Migration):

    dependencies = [
        ('duoc_djangobackend', '0002_add_all_dummy_data'),
    ]

    operations = [
        migrations.RunPython(crear_anexo_y_procesar),
    ]