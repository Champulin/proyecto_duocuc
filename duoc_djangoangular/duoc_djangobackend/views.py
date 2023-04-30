from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *

#  NORMAL GENERICS
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

# GENERICS API

from rest_framework import generics


# Conversiones a json

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser



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
    
# _________________ CRUDS API _______________________

# _________________ PROVEEDOR TELEFONIA CRUD API __________________________
@api_view(['POST', 'GET'])

def proveedor_collection(request):
    
    if request.method == 'GET':
        proveedor = ProveedoresTelefonia.objects.all()
        
        serializer = ProveedoresTelefoniaSerializer(proveedor, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        
        serializer = ProveedoresTelefoniaSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def proveedor_element(request, pk):
    # Usaremos get_object_or_404 para mandarnos una 404
    proveedor = get_object_or_404(ProveedoresTelefonia, id_proveedor=pk)
    # GET
    if request.method == 'GET':
        serializer = ProveedoresTelefoniaSerializer(proveedor)
        return Response(serializer.data)
    # Eliminar y Editar
    # UPDATE
    elif request.method == 'PUT':
        proveedor_new= JSONParser().parse(request)
        serializer= ProveedoresTelefoniaSerializer(proveedor, data=proveedor_new)
        
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    
    # DELETE
    elif request.method == 'DELETE':
        
        proveedor.delete()
        # Respuesta sin contenido
        return Response(status=status.HTTP_204_NO_CONTENT)

# ___________________________ API GENERICS __________________________

# Cuentas presupuestarias

class cuentapre_collection(generics.ListCreateAPIView):
    queryset = CuentaPresupuestaria.objects.all()
    serializer_class = CuentaPresupuestariaSerializer
    
class cuentapre_element(generics.RetrieveUpdateDestroyAPIView):
    
    # LOOKUP_FIELD = CAMPO QUE BUSCARA EN LA BD | LOOKUP_URL_KWARG = NOMBRE DEL VALOR EN LA URL PARA BUSCAR EL CAMPO
    
    queryset = CuentaPresupuestaria.objects.all()
    serializer_class = CuentaPresupuestariaSerializer
    lookup_field = 'id_facultad'
    lookup_url_kwarg = 'pk'
    
# Unidad

class unidad_collection(generics.ListCreateAPIView):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    
class unidad_element(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    lookup_field = 'id_unidad'
    lookup_url_kwarg = 'pk'

# Anexo

class anexo_collection(generics.ListCreateAPIView):
    queryset = Anexo.objects.all()
    serializer_class = AnexoSerializer
    
class anexo_element(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Anexo.objects.all()
    serializer_class = AnexoSerializer
    lookup_field = 'id_anexo'
    lookup_url_kwarg = 'pk'

# Registro llamada

class registro_collection(generics.ListCreateAPIView):
    queryset = RegistroLlamada.objects.all()
    serializer_class = RegistroLlamadaSerializer
    
class registro_element(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = RegistroLlamada.objects.all()
    serializer_class = RegistroLlamadaSerializer
    lookup_field = 'id_anexo'
    lookup_url_kwarg = 'pk'

# Calculo mensual

class calculo_collection(generics.ListCreateAPIView):
    queryset = CalculoMensual.objects.all()
    serializer_class = CalculoMensualSerializer
    
class calculo_element(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = CalculoMensual.objects.all()
    serializer_class = CalculoMensualSerializer
    lookup_field = 'id_facultad'
    lookup_url_kwarg = 'pk'
    