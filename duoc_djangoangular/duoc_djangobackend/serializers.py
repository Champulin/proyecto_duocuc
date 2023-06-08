from rest_framework import serializers
from .models import *


class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = "__all__"


class ResponsableUnidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponsableUnidad
        fields = "__all__"

class ResponsableUnidadPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResponsableUnidad
        fields = "__all__"
        extra_kwargs = {'password':{'write_only': False}}

class ProveedoresTelefoniaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProveedoresTelefonia
        fields = "__all__"


class CuentaPresupuestariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentaPresupuestaria
        fields = "__all__"


class UnidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad
        fields = "__all__"


class AnexoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anexo
        fields = "__all__"


class RegistroLlamadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroLlamada
        fields = "__all__"


class CalculoMensualUnidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculoMensualUnidad
        fields = "__all__"
class CalculoMensualFacultadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculoMensualFacultad
        fields = "__all__"
        
class NotificacionesSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Notificaciones
        fields  = "__all__"