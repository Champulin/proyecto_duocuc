"""
URL configuration for duoc_djangobackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path("", admin.site.urls),
    path("admin/", admin.site.urls),
    path("login/", login_view),
    path("insertar_anexo/", insert_anexo),
]
# URLS API

urlpatterns += [
    # Proveedor
    # RECORDAR COLLECTION ES PARA CREAR O LISTAR GENERAL | ELEMENT PARA UNO
    # _____________ NORMAL ________________
    path("api/proveedor/", proveedor_collection, name="proveedor_collection"),
    path("api/proveedor/<int:pk>", proveedor_element, name="proveedor_element"),
    # _____________ GENÉRICOS ________________
    # Cuenta presupuestaria
    path("api/cuentapre/", cuentapre_collection.as_view(), name="cuentapre_collection"),
    path(
        "api/cuentapre/<int:id_facultad>",
        cuentapre_element.as_view(),
        name="cuentapre_element",
    ),
    # Unidad
    # This one is for List(get) and Create(post)
    path("api/unidad/", unidad_collection.as_view(), name="anexo_collection"),
    # This one is for Get, Put, Patch and Delete
    path("api/unidad/<str:pk>", unidad_element.as_view(), name="anexo_element"),
    # Anexo
    path("api/anexo/", anexo_collection.as_view(), name="anexo_collection"),
    path("api/anexo/<int:pk>", anexo_element.as_view(), name="anexo_element"),
    # Registro
    path("api/registro/", registro_collection.as_view(), name="anexo_collection"),
    path("api/registro/<int:pk>", registro_element.as_view(), name="anexo_element"),
    # Calculo mensual
    path("api/calculo/", calculo_collection.as_view(), name="anexo_collection"),
    path("api/calculo/<int:pk>", calculo_element.as_view(), name="anexo_element"),
    # Responsable Unidad
    path("api/responsable/", user_collection.as_view(), name="user_collection"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
