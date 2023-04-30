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


class CalculoMensualSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculoMensual
        fields = "__all__"