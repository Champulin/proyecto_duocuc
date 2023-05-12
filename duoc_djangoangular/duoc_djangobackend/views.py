from django.contrib.auth import login
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse_lazy
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from django.views.decorators.csrf import csrf_exempt
from .anexo_operations import *

#  NORMAL GENERICS
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

# GENERICS API

from rest_framework import generics

# Conversiones a json

from rest_framework.parsers import JSONParser


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    print("logeando user")
    print(username, password)

    user = None
    try:
        user = Administrator.objects.get(username=username)
    except Administrator.DoesNotExist:
        try:
            user = ResponsableUnidad.objects.get(username=username)
        except ResponsableUnidad.DoesNotExist:
            pass
    print(user)
    if user is not None and check_password(password, user.password):
        # Login successful
        request.session["_auth_user_id"] = str(user.pk)
        if isinstance(user, Administrator):
            serializer = AdministratorSerializer(user)
            user_type = "Administrator"
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
@api_view(["POST", "GET"])
def proveedor_collection(request):
    if request.method == "GET":
        proveedor = ProveedoresTelefonia.objects.all()

        serializer = ProveedoresTelefoniaSerializer(proveedor, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = ProveedoresTelefoniaSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def proveedor_element(request, pk):
    # Usaremos get_object_or_404 para mandarnos una 404
    proveedor = get_object_or_404(ProveedoresTelefonia, id_proveedor=pk)
    # GET
    if request.method == "GET":
        serializer = ProveedoresTelefoniaSerializer(proveedor)
        return Response(serializer.data)
    # Eliminar y Editar
    # UPDATE
    elif request.method == "PUT":
        proveedor_new = JSONParser().parse(request)
        serializer = ProveedoresTelefoniaSerializer(proveedor, data=proveedor_new)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    elif request.method == "DELETE":
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
    lookup_field = "id_facultad"
    lookup_url_kwarg = "pk"


# Unidad


class unidad_collection(generics.ListCreateAPIView):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer


class unidad_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    lookup_field = "id_unidad"
    lookup_url_kwarg = "pk"


# Anexo


class anexo_collection(generics.ListCreateAPIView):
    queryset = Anexo.objects.all()
    serializer_class = AnexoSerializer


class anexo_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = Anexo.objects.all()
    serializer_class = AnexoSerializer
    lookup_field = "id_anexo"
    lookup_url_kwarg = "pk"


# Registro llamada


class registro_collection(generics.ListCreateAPIView):
    queryset = RegistroLlamada.objects.all()
    serializer_class = RegistroLlamadaSerializer


class registro_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = RegistroLlamada.objects.all()
    serializer_class = RegistroLlamadaSerializer
    lookup_field = "id_anexo"
    lookup_url_kwarg = "pk"


# Calculo mensual


class calculo_collection(generics.ListCreateAPIView):
    queryset = CalculoMensual.objects.all()
    serializer_class = CalculoMensualSerializer


class calculo_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = CalculoMensual.objects.all()
    serializer_class = CalculoMensualSerializer
    lookup_field = "id_facultad"
    lookup_url_kwarg = "pk"


@csrf_exempt
@api_view(["POST"])
def insert_anexo(request):
    """Ingresa en la base de datos un anexo y procesa sus datos.
    Args: request (HttpRequest): Request que contiene los datos del anexo.
    Returns: HttpResponse: Respuesta de la petición.
    """
    id_anexo = request.POST.get("id_anexo")
    id_facultad = request.POST.get("id_facultad")
    id_unidad = request.POST.get("id_unidad")
    nombre_anexo = request.POST.get("nombre_anexo")
    fecha_creacion = request.POST.get("fecha_creacion")
    file = request.FILES.get("file")
    try:
        Anexo.objects.create(
            id_anexo=id_anexo,
            id_facultad=id_facultad,
            id_unidad=id_unidad,
            nombre_anexo=nombre_anexo,
            fecha_creacion=fecha_creacion,
            file=file,
        )
        process_anexo(id_facultad, id_unidad, id_anexo, file)
    except Exception as e:
        response_data = {"message": f"Error al crear anexo: {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Insercion terminada con exito"})


@api_view(["POST"])
def calculo_general(request):
    """Calcula el costo mensual de cada facultad.
    Args: request (HttpRequest): Request que contiene los datos del anexo.
    Returns: HttpResponse: Respuesta de la petición.
    """
    id_facultad = request.POST.get("id_facultad")
    mes = request.POST.get("mes")
    try:
        calculo_mensual_general(mes, id_facultad)
    except Exception as e:
        response_data = {"message": f"Error al calcular el costo mensual: {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Calculo mensual terminado con exito"})


@api_view(["POST"])
def calculo_unidad(request):
    """
    Calcula el costo mensual de una Unidad en especifico, tomando en cuenta el 28 del mes anterior al mes que se desea calcular.
    Args: request (HttpRequest): Request que contiene los datos del mes a calcular, id_unidad, id_facultad, id_anexo.
    Returns: HttpResponse: Respuesta de la petición.
    """
    id_anexo = request.POST.get("id_anexo")
    mes = request.POST.get("mes")
    try:
        calculo_mensual_unidad(mes, id_anexo)
    except Exception as e:
        response_data = {"message": f"Error al calcular el costo mensual: {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Calculo mensual terminado con exito"})
