from djongo import models
from django.contrib.auth.hashers import make_password


class Administrator(models.Model):
    _id = models.ObjectIdField()
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=100)
    
    class Meta:
        db_table =  "Administrator"
        verbose_name= "Administrator"
        verbose_name_plural = "Administrators"

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(Administrator, self).save(*args, **kwargs)


class ResponsableUnidad(models.Model):
    _id = models.ObjectIdField()
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=100)

    class Meta:
        db_table =  "ResponsableUnidad"
        verbose_name= "Responsable unidad"
        verbose_name_plural = "Responsables de unidad"
        
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(ResponsableUnidad, self).save(*args, **kwargs)


class ProveedoresTelefonia(models.Model):
    _id = models.ObjectIdField()
    id_proveedor = models.IntegerField()
    nombre_proveedor = models.CharField(max_length=50)
    costo_seg_cel = models.IntegerField()
    costo_seg_ldi = models.IntegerField()
    costo_seg_slm = models.IntegerField()
    
    class Meta:
        db_table =  "ProveedoresTelefonia"
        verbose_name= "Proveedor de telefonia"
        verbose_name_plural = "Proveedores de telefonia"


class CuentaPresupuestaria(models.Model):
    _id = models.ObjectIdField()
    id_proveedor = models.IntegerField()
    id_facultad = models.IntegerField()
    nombre_facultad = models.CharField(max_length=50)
    siglas_facultad = models.CharField(max_length=10)
    class Meta:
        db_table =  "CuentaPresupuestaria"
        verbose_name= "Cuenta presupuestaria"
        verbose_name_plural = "Cuentas presupuestarias"


class Unidad(models.Model):
    _id = models.ObjectIdField()
    id_unidad = models.IntegerField()
    nombre_depto = models.CharField(max_length=50)
    siglas_depto = models.CharField(max_length=10)
    id_facultad = models.IntegerField()
    
    class Meta:
        db_table =  "Unidad"
        verbose_name= "Unidad"
        verbose_name_plural = "Unidades"


class Anexo(models.Model):
    _id = models.ObjectIdField()
    id_anexo = models.IntegerField()
    id_facultad = models.IntegerField()
    id_unidad = models.IntegerField()
    nombre_anexo = models.CharField(max_length=50)
    fecha_creacion = models.DateField()
    
    class Meta:
        db_table =  "Anexo"
        verbose_name= "Anexo"
        verbose_name_plural = "Anexos"

    


class RegistroLlamada(models.Model):
    _id = models.ObjectIdField()
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
    
    class Meta:
        db_table =  "RegistroLlamada"
        verbose_name= "Registro de llamada"
        verbose_name_plural = "Registros de llamadas"


class CalculoMensual(models.Model):
    _id = models.ObjectIdField()
    id_facultad = models.IntegerField()
    nombre_depto = models.CharField(max_length=50)
    tarificacion_general = models.IntegerField()
    tarificacion_slm = models.IntegerField()
    tarificacion_cel = models.IntegerField()
    tarificacion_ldi = models.IntegerField()
    fecha = models.DateField()
    
    class Meta:
        db_table =  "CalculoMensual"
        verbose_name= "Calculo Mensual"
        verbose_name_plural = "Calculos Mensuales"
