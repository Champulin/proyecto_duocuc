from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *


@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user is not None:
        # Login successful
        if isinstance(user, Administrator):
            serializer = AdministratorSerializer(user)
            user_type = "Administrator"
            # Data adicional para usuario administrador
        #     response_data = serializer.data,
        # 'proveedores_telefonia': ProveedoresTelefoniaSerializer(get_all_probeedores_telefonia(), many=True).data,
        # 'cuentas_presupuestarias': CuentaPresupuestariaSerializer(get_all_cuentas_presupuestarias(), many=True).data,
        # 'unidades': UnidadSerializer(get_all_unidades(), many=True).data,
        # 'anexos': AnexoSerializer(get_all_anexos(), many=True).data,
        # 'registros_llamadas': RegistroLlamadaSerializer(get_all_registros_llamadas(), many=True).data,
        # 'calculo_mensual': CalculoMensualSerializer(get_all_calculos_mensuales(), many=True).data,

        elif isinstance(user, ResponsableUnidad):
            serializer = ResponsableUnidadSerializer(user)
            user_type = "ResponsableUnidad"
        response_data = serializer.data
        response_data["user_type"] = user_type
        return Response(response_data)
    else:
        # Login failed
        response_data = {"error": "Datos de login invalidos"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


# _________________ CRUDS _______________________
