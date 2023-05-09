# Generated by Django 4.1.8 on 2023-05-09 02:57

from django.db import migrations
from django.contrib.auth.hashers import make_password


def add_data(apps, schema_editor):
    Administrator = apps.get_model('duoc_djangobackend', 'Administrator')
    ResponsableUnidad = apps.get_model('duoc_djangobackend', 'ResponsableUnidad')

    # Create an administrator user
    admin = Administrator(name='Vicente', last_name='Zurita', email='vice.zurita@duocuc.cl',
                          username='admin', password=make_password('password'))
    admin.save()

    # Create a responsible unit user
    responsable = ResponsableUnidad(name='Paulo', last_name='Olavarria', email='paulo.olavarria@gmail.com',
                                    id_unidad=1, id_facultad=1, username='responsable', password=make_password('password'))
    responsable.save()


class Migration(migrations.Migration):

    dependencies = [
        ('duoc_djangobackend', '0004_alter_registrollamada_hora_llamada'),
    ]

    operations = [
        migrations.RunPython(add_data),
    ]