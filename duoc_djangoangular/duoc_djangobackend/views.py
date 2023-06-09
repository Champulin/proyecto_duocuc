from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from django.views.decorators.csrf import csrf_exempt
from .anexo_operations import (
    process_anexo,
    calculo_mensual_unidad,
    reprocess_anexo,
    calculo_mensual_general,
    consultar_trafico_llamada,
    generate_csv,
    delete_all_files,
)

# Import from py mongo bson.objectid para pasar los strings a ObjectId's
from bson.objectid import ObjectId
import logging

# GENERICS API
from rest_framework import generics

# Conversiones a json
from rest_framework.parsers import JSONParser


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    print("login user")
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
        nombre_unidad = ""
        if isinstance(user, Administrator):
            serializer = AdministratorSerializer(user)
            user_type = "Administrator"
        elif isinstance(user, ResponsableUnidad):
            serializer = ResponsableUnidadSerializer(user)
            user_type = "ResponsableUnidad"
            nombre_unidad = Unidad.objects.get(id_unidad=user.id_unidad).nombre_depto
        response_data = serializer.data
        response_data["user_type"] = user_type
        response_data["nombre_unidad"] = nombre_unidad
        return Response(response_data)
    else:
        # Login failed
        response_data = {"error": "Datos de login no son correctos"}
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


# _________________ FIN PROVEEDORES ______________________

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


# _________________ FIN CUENTAS PRESUPUESTARIAS ______________________

# Unidad


class unidad_collection(generics.ListCreateAPIView):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer


class unidad_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = Unidad.objects.all()
    serializer_class = UnidadSerializer
    lookup_field = "id_unidad"
    lookup_url_kwarg = "pk"


# _________________ FIN UNIDAD ______________________


class user_collection(generics.ListCreateAPIView):
    queryset = ResponsableUnidad.objects.all()
    serializer_class = ResponsableUnidadSerializer


class user_element(generics.RetrieveUpdateDestroyAPIView):
    def get_object(self):
        pk = self.kwargs["pk"]
        queryset = ResponsableUnidad.objects.get(_id=ObjectId(pk))
        return queryset

    serializer_class = ResponsableUnidadSerializer


class user_element2(generics.RetrieveUpdateDestroyAPIView):
    def get_object(self):
        pk = self.kwargs["pk"]
        queryset = ResponsableUnidad.objects.get(_id=ObjectId(pk))
        return queryset

    serializer_class = ResponsableUnidadPasswordSerializer


# _________________ FIN RESPONSABLE DE UNIDAD ______________________

# Administrador


class admin_collection(generics.ListCreateAPIView):
    queryset = Administrator.objects.all()
    serializer_class = AdministratorSerializer


class admin_element(generics.RetrieveUpdateDestroyAPIView):
    def get_object(self):
        pk = self.kwargs["pk"]
        queryset = Administrator.objects.get(_id=ObjectId(pk))

        return queryset

    serializer_class = AdministratorSerializer


# _________________ FIN ADMINISTRADOR ______________________

# Anexo


class anexo_collection(generics.ListCreateAPIView):
    queryset = Anexo.objects.all()
    serializer_class = AnexoSerializer


class anexo_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = Anexo.objects.all()
    serializer_class = AnexoSerializer
    lookup_field = "id_anexo"
    lookup_url_kwarg = "pk"


# _________________ FIN ANEXOS ______________________

# Registro llamada


class registro_collection(generics.ListCreateAPIView):
    queryset = RegistroLlamada.objects.all()
    serializer_class = RegistroLlamadaSerializer


# Consultar registro de llamadas por proveedor de telefonia CU


class registroprov_collection(generics.ListAPIView):
    def get_queryset(self):
        pk = self.kwargs["pk"]

        queryset = RegistroLlamada.objects.filter(nombre_proveedor=str.capitalize(pk))

        return queryset

    serializer_class = RegistroLlamadaSerializer


class registro_element(generics.RetrieveUpdateDestroyAPIView):
    def get_object(self):
        pk = self.kwargs["pk"]
        queryset = RegistroLlamada.objects.get(_id=ObjectId(pk))

        return queryset

    serializer_class = RegistroLlamadaSerializer


# _________________ FIN REGISTRO DE LLAMADAS ______________________


# Calculo mensual unidad


class calculouni_collection(generics.ListCreateAPIView):
    queryset = CalculoMensualUnidad.objects.all()
    serializer_class = CalculoMensualUnidadSerializer


class calculouni_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = CalculoMensualUnidad.objects.all()
    serializer_class = CalculoMensualUnidadSerializer
    lookup_field = "id_unidad"
    lookup_url_kwarg = "pk"

    # def get_object(self):
    #     pk = self.kwargs['pk']
    #     queryset = CalculoMensualUnidad.objects.get(_id=ObjectId(pk))

    #     return queryset

    # serializer_class = CalculoMensualUnidadSerializer


# _________________ FIN CALCULO MENSUAL UNIDAD ______________________

# Calculo mensual Facultad

# En el futuro asegurarse que cuando hagan un generic para dos tablas con nombres similares
# que por favor cambien el nombre tras copiar y pegar, que esto estaba como CalculoMensualUnidad
class calculofac_collection(generics.ListCreateAPIView):
    queryset = CalculoMensualFacultad.objects.all()
    serializer_class = CalculoMensualFacultadSerializer


class calculofac_element(generics.RetrieveUpdateDestroyAPIView):
    queryset = CalculoMensualFacultad.objects.all()
    serializer_class = CalculoMensualFacultadSerializer
    lookup_field = "id_facultad"
    lookup_url_kwarg = "pk"

    # def get_object(self):
    #     pk = self.kwargs['pk']
    #     queryset = CalculoMensualFacultad.objects.get(_id=ObjectId(pk))

    #     return queryset

    # serializer_class = CalculoMensualFacultadSerializer


# _________________ FIN CALCULO MENSUAL FACULTAD ______________________
@api_view(["POST"])
def consultar_trafico(request):
    """Recibe un nombre_proveedor y un mes y devuelve el trafico de llamadas de ese mes."""
    nombre_proveedor = request.data.get("nombre_proveedor")
    mes = int(request.data.get("mes"))
    try:
        trafico = consultar_trafico_llamada(nombre_proveedor, mes)
        return Response(trafico, status=status.HTTP_200_OK)
    except Exception as e:
        error_message = f"Error en consultar_trafico: {e}"
        logging.error(error_message)
        return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def generate_report(request):
    """
    Recibe una unidad o facultad para generar un reporte con el mes actual
    Args: request (HttpRequest): Request que contiene los datos de la unidad o facultad en formato string y un tipo_reporte.
    Returns: HttpResponse: Respuesta de la petición.
    """
    tipo_reporte = request.data.get("tipo_reporte")
    nombre = request.data.get("nombre")
    mes = request.data.get("mes")
    object_id = request.data.get("object_id")
    try:
        response = generate_csv(nombre, tipo_reporte, mes, object_id)
        return response
    except Exception as e:
        error_message = f"Error en generate_report: {e}"
        logging.error(error_message)
        return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def insert_anexo(request):
    """Ingresa en la base de datos un anexo y procesa sus datos.
    Args: request (HttpRequest): Request que contiene los datos del anexo.
    Returns: HttpResponse: Respuesta de la petición.
    """
    print("llego el request")
    id_anexo = request.POST.get("id_anexo")
    id_facultad = request.POST.get("id_facultad")
    id_unidad = request.POST.get("id_unidad")
    nombre_anexo = request.POST.get("nombre_anexo")
    file = request.FILES.get("file")
    print("llegue al Try")
    try:
        Anexo.objects.create(
            id_anexo=id_anexo,
            id_facultad=id_facultad,
            id_unidad=id_unidad,
            nombre_anexo=nombre_anexo,
            file=file,
        )
        process_anexo(id_facultad, id_unidad, id_anexo, file)
    except Exception as e:
        response_data = {"message": f"Error al crear anexo: {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Insertion terminada"})


@api_view(["POST"])
def corregir_anexo(request):
    """Corrige la data de un anexo y vuelve a procesar sus datos
    return: HttpResponse: Respuesta de la petición.
    """
    id_anexo = request.data.get("id_anexo")
    try:
        reprocess_anexo(id_anexo)
        return Response({"message": "Corrección terminada"})
    except Exception as e:
        response_data = {"message": f"Error {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def calculo_general(request):
    """Calcula el costo mensual de cada facultad.
    Args: request (HttpRequest): Request que contiene los datos del anexo.
    Returns: HttpResponse: Respuesta de la petición.
    """
    id_facultad = request.data.get("id_facultad")
    mes = request.data.get("mes")
    try:
        calculo_mensual_general(mes, id_facultad)
    except Exception as e:
        response_data = {"message": f"Error al calcular el costo mensual: {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Calculo mensual terminado"})


@api_view(["POST"])
def calculo_unidad(request):
    """
    Calcula el costo mensual de una Unidad en especifico, tomando en cuenta el 28 del mes anterior al mes que se desea calcular.
    Args: request (HttpRequest): Request que contiene los datos del mes a calcular, id_unidad, id_facultad, id_anexo.
    Returns: HttpResponse: Respuesta de la petición.
    """
    id_anexo = int(request.data.get("id_anexo"))
    try:
        calculo_mensual_unidad(id_anexo)
    except Exception as e:
        response_data = {"message": f"Error al calcular el costo mensual: {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Calculo mensual terminado"})


@csrf_exempt
@api_view(["POST"])
def crear_usuario(request):
    """Function que crea usuario admin o responsable de unidad dependiendo del request
    Args: request (HttpRequest): Request que contiene los datos del usuario a crear.
    Returns: HttpResponse: Respuesta de la petición.
    """
    tipo = request.data.get("tipo")
    name = request.data.get("name")
    last_name = request.data.get("last_name")
    email = request.data.get("email")
    username = request.data.get("username")
    password = request.data.get("password")
    if tipo == "admin":
        try:
            Administrator.objects.create(
                name=name,
                last_name=last_name,
                email=email,
                username=username,
                password=password,
            )
        except Exception as e:
            response_data = {"message": f"Error al crear usuario: {e}"}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    elif tipo == "responsable":
        id_unidad = request.data.get("id_unidad")
        id_facultad = request.data.get("id_facultad")
        try:
            ResponsableUnidad.objects.create(
                name=name,
                last_name=last_name,
                email=email,
                id_unidad=id_unidad,
                id_facultad=id_facultad,
                username=username,
                password=password,
            )
        except Exception as e:
            response_data = {"message": f"Error al crear usuario: {e}"}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
    else:
        response_data = {"message": f"Error al crear usuario: tipo de usuario invalido"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Usuario creado"})


@api_view(["POST"])
def clear_folder(request):
    """Function que limpia la carpeta de archivos temporales
    Args: request (HttpRequest): Request que contiene los datos del usuario a crear.
    Returns: HttpResponse: Respuesta de la petición.
    """
    try:
        delete_all_files("duoc_djangobackend/media/reportes")
    except Exception as e:
        response_data = {"message": f"Error al limpiar carpeta: {e}"}
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "Carpeta limpiada"})
