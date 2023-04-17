from django.db import models
from django.contrib.auth.models import AbstractUser


class Administrator(AbstractUser):
    pass


class ResponsableUnidad(AbstractUser):
    id_facultad = models.IntegerField()
    id_unidad = models.IntegerField()


class ProveedoresTelefonia(models.Model):
    id_proveedor = models.IntegerField()
    nombre_proveedor = models.CharField(max_length=50)
    costo_seg_cel = models.IntegerField()
    costo_seg_ldi = models.IntegerField()
    costo_seg_slm = models.IntegerField()


class CuentaPresupuestaria(models.Model):
    id_proveedor = models.IntegerField()
    id_facultad = models.IntegerField()
    nombre_facultad = models.CharField(max_length=50)
    siglas_facultad = models.CharField(max_length=10)


class Unidad(models.Model):
    id_unidad = models.IntegerField()
    nombre_depto = models.CharField(max_length=50)
    siglas_depto = models.CharField(max_length=10)
    id_facultad = models.IntegerField()


class Anexo(models.Model):
    id_anexo = models.IntegerField()
    id_facultad = models.IntegerField()
    id_unidad = models.IntegerField()
    nombre_anexo = models.CharField(max_length=50)
    fecha_creacion = models.DateField()


class RegistroLlamada(models.Model):
    id_anexo = models.IntegerField()
    id_facultad = models.IntegerField()
    id_unidad = models.IntegerField()
    nombre_proveedor = models.CharField(max_length=50)
    tipo_llamada_siglas = models.CharField(max_length=10)
    numero_telefono = models.IntegerField()
    siglas_depto = models.CharField(max_length=10)
    fecha_llamada = models.DateField()
    hora_llamada = models.DateField()
    duracion_llamada = models.IntegerField()
    tipo_respuesta = models.CharField(max_length=50)
    siglas_facultad = models.CharField(max_length=10)
    siglas_depto = models.CharField(max_length=10)
    nombre_destinatario = models.CharField(max_length=50)


class CalculoMensual(models.Model):
    id_facultad = models.IntegerField()
    nombre_depto = models.CharField(max_length=50)
    tarificacion_general = models.IntegerField()
    tarificacion_slm = models.IntegerField()
    tarificacion_cel = models.IntegerField()
    tarificacion_ldi = models.IntegerField()
    fecha = models.DateField()
