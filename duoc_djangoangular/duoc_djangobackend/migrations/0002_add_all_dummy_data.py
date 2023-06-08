# Generated by Django 4.1.8 on 2023-05-16 14:32
# Generated by Django 4.1.8 on 2023-05-10 00:45

from django.db import migrations
from django.contrib.auth.hashers import make_password
from django.core.files import File
from ..anexo_operations import process_anexo,calculo_mensual_unidad
import os


def add_data(apps, schema_editor):
    Administrator = apps.get_model('duoc_djangobackend', 'Administrator')
    ResponsableUnidad = apps.get_model('duoc_djangobackend', 'ResponsableUnidad')
    Unidad = apps.get_model('duoc_djangobackend', 'Unidad')
    Facultad = apps.get_model('duoc_djangobackend', 'CuentaPresupuestaria')
    Proveedor = apps.get_model('duoc_djangobackend', 'ProveedoresTelefonia')
    Anexo = apps.get_model('duoc_djangobackend', 'Anexo')
    Notificaciones = apps.get_model('duoc_djangobackend', 'Notificaciones')
    # Crear un Administrador
    admin = Administrator(name='Vicente', last_name='Zurita', email='vice.zurita@duocuc.cl',
                          username='admin', password=make_password('password'))
    admin.save()

    # Crear un Responsable de Unidad
    responsable = ResponsableUnidad(name='Paulo', last_name='Olavarria', email='paulo.olavarria@gmail.com',
                                    id_unidad=1, id_facultad=1, username='responsable', password=make_password('password'))
    responsable.save()
    #Crear Facultades
    facultad1 = Facultad(id_facultad=1, nombre_facultad='Ingenieria', siglas_facultad='ING',id_proveedor=1)
    facultad1.save()
    facultad2 = Facultad(id_facultad=2, nombre_facultad='Hoteleria y Turismo', siglas_facultad='HTL',id_proveedor=2)
    facultad2.save()
    facultad3 = Facultad(id_facultad=3, nombre_facultad='Ciencias Forenses', siglas_facultad='CRM',id_proveedor=3)
    facultad3.save()
    # Crear Unidades
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
    # Crear Proveedores
    proveedor1 = Proveedor(id_proveedor=1, nombre_proveedor='Movistar', costo_seg_cel = 3, costo_seg_ldi = 2, costo_seg_slm = 6)
    proveedor1.save()
    proveedor2 = Proveedor(id_proveedor=2, nombre_proveedor='Entel', costo_seg_cel = 4, costo_seg_ldi = 3, costo_seg_slm = 7)
    proveedor2.save()
    proveedor3 = Proveedor(id_proveedor=3, nombre_proveedor='Claro', costo_seg_cel = 5, costo_seg_ldi = 4, costo_seg_slm = 8)
    proveedor3.save()
    # Crear notificaciones
    notificacion1 = Notificaciones(id_unidad=1, titulo="Aviso de nuevos reportes tarificación", cuerpo="Ya se encuentran disponibles los nuevos reportes de tarificación.")
    notificacion1.save()
    



class Migration(migrations.Migration):

    dependencies = [
        ('duoc_djangobackend', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_data),
    ]
