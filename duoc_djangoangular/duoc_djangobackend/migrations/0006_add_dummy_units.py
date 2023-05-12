# Generated by Django 4.1.8 on 2023-05-10 00:45

from django.db import migrations
from django.contrib.auth.hashers import make_password


def add_data(apps, schema_editor):
    Unidad = apps.get_model('duoc_djangobackend', 'Unidad')

    # Create a unit entry
    unidad1 = Unidad(id_unidad=1, nombre_depto='Metalurgia', siglas_depto='MTL',
                          id_facultad=1)
    unidad1.save()

    unidad2 = Unidad(id_unidad=2, nombre_depto='Informatica', siglas_depto='INF',
                          id_facultad=1)
    unidad2.save()

    unidad3 = Unidad(id_unidad=3, nombre_depto='Hoteleria', siglas_depto='HTL',
                          id_facultad=2)
    unidad3.save()

    unidad4 = Unidad(id_unidad=4, nombre_depto='Turismo', siglas_depto='TSM',
                          id_facultad=2)
    unidad4.save()

    unidad5 = Unidad(id_unidad=5, nombre_depto='Criminologia', siglas_depto='CRM',
                          id_facultad=3)
    unidad5.save()

    unidad6 = Unidad(id_unidad=6, nombre_depto='Forensica', siglas_depto='FRN',
                          id_facultad=3)
    unidad6.save()


class Migration(migrations.Migration):

    dependencies = [
        ('duoc_djangobackend', '0005_add_dummy_users'),
    ]

    operations = [
        migrations.RunPython(add_data),
    ]