from django.test import TestCase
from .models import (
    Administrator,
    ResponsableUnidad,
    ProveedoresTelefonia,
    CuentaPresupuestaria,
    Unidad,
    Anexo,
    RegistroLlamada,
    CalculoMensual,
)


class ModelTests(TestCase):
    """TEST DE MODELOS"""

    def test_administrator_model(self):
        admin = Administrator.objects.create(username="admin", password="12345")
        self.assertEqual(admin.is_administrador, True)
        self.assertEqual(admin.__str__(), admin.username)
        self.assertEqual(Administrator._meta.permissions[0][0], "admin")

    def test_responsable_unidad_model(self):
        res_unidad = ResponsableUnidad.objects.create(
            username="res_unidad", password="12345", id_facultad=1, id_unidad=1
        )
        self.assertEqual(res_unidad.__str__(), res_unidad.username)
        self.assertEqual(
            ResponsableUnidad._meta.permissions[0][0], "responsable_unidad"
        )

    def test_proveedor_model(self):
        proveedor = ProveedoresTelefonia.objects.create(
            id_proveedor=1,
            nombre_proveedor="Proveedor1",
            costo_seg_cel=10,
            costo_seg_ldi=5,
            costo_seg_slm=2,
        )
        self.assertEqual(proveedor.__str__(), proveedor.nombre_proveedor)

    def test_cuenta_presupuestaria_model(self):
        cuenta = CuentaPresupuestaria.objects.create(
            id_proveedor=1,
            id_facultad=1,
            nombre_facultad="Facultad1",
            siglas_facultad="FAC1",
        )
        self.assertEqual(cuenta.__str__(), cuenta.siglas_facultad)

    def test_unidad_model(self):
        unidad = Unidad.objects.create(
            id_unidad=1,
            nombre_depto="Departamento1",
            siglas_depto="DEP1",
            id_facultad=1,
        )
        self.assertEqual(unidad.__str__(), unidad.siglas_depto)

    def test_anexo_model(self):
        anexo = Anexo.objects.create(
            id_anexo=1,
            id_facultad=1,
            id_unidad=1,
            nombre_anexo="AnexoA",
            fecha_creacion="2021-05-06",
        )
        self.assertEqual(anexo.__str__(), anexo.nombre_anexo)

    def test_registro_llamada_model(self):
        llamada = RegistroLlamada.objects.create(
            id_anexo=1,
            id_facultad=1,
            id_unidad=1,
            nombre_proveedor="Proveedor1",
            tipo_llamada_siglas="LDI",
            numero_telefono=123456789,
            siglas_depto="DEP1",
            fecha_llamada="2021-05-06",
            hora_llamada="12:30:00",
            duracion_llamada=60,
            tipo_respuesta="Respuesta1",
            siglas_facultad="FAC1",
            nombre_destinatario="DestinatarioA",
        )
        self.assertEqual(llamada.__str__(), llamada.nombre_destinatario)

    def test_calculo_mensual_model(self):
        calculo = CalculoMensual.objects.create(
            id_facultad=1,
            nombre_depto="Departamento1",
            tarificacion_general=100,
            tarificacion_slm=50,
            tarificacion_cel=10,
            tarificacion_ldi=5,
            fecha="2021-05-06",
        )
        self.assertEqual(calculo.__str__(), calculo.nombre_depto)
