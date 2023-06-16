# Instrucciones de despliegue de aplicación.

# Creación de usuario admin para MongoDB

Requisitos:

Haber seguido guía de instalación de MongoDB Community Server propiciada en el mismo google drive y tenerlo correctamente instalado:
Guia con imagenes: [Instalacion MongoDB Compass, community server y shell](https://docs.google.com/document/d/162ce0lGAbX0qPjNNAtHCeYmrAW5sHSpIfywDXI7i7G0/).

Tambien se puede descargar desde [aqui](https://www.mongodb.com/try/download/community)

> Si se trabaja desde Windows:
> Descargar MongoShell desde: [Mongo Shell](chrome-extension://jaekigmcljkkalnicnjoafgfjoefkpeg/suspended.html#ttl=MongoDB%20Shell%20Download%20%7C%20MongoDB&pos=1000&uri=https://www.mongodb.com/try/download/shell)

> Descomprimir y dirigirse a directorio bin

> Ejecutar mongosh.exe

![1686803118517](image/README/1686803118517.png)

Escribir los siguientes comandos:

```
use admin

```

```
db.createUser(
  {
    user: "myAdmin",
    pwd: "myAdminPassword",
    roles: [ { role: "root", db: "admin" } ]
  }
)
```

Comprobar creación de usuario con:

```
db.getUser("myAdmin")
```

# Instalación y configuración de BackEnd

Pre-requisitos:

Tener creado usuario Admin a través de Mongo Shell y haber instalado MongoDB Compass

Tener instalado Pip, Python, NodeJS

Instrucciones de levantamiento de ambientes de desarrollo:

> Todos los comandos son a ejecutar en la línea de comandos cmd.

> con la terminal de comandos en el directorio root del proyecto

Instalar ambiente virtual

```
pip install virtualenv
```

Crear ambiente virtual, utilizamos "django_env" en este ejemplo, cambiar nombre de env en caso de usar otro.

```
virtualenv django_env
```

Activar ambiente virtual --este comando deberá re-ejecutarse cada vez que se quiera lanzar django, todas las instalaciones subsiguientes se realizaran con el env activado

```
django_env\Scripts\activate
```

Una vez activado, la terminal debería verse de tal manera (nombre_env)path\to\project\proyecto_duocuc>, siendo "path\to\project" la ruta de su computador hacia el proyecto clonado.

> Imagen de ejemplo:

![1682279843309](image/README/1682279843309.png)

Instalación requerimientos del proyecto

```
pip install -r requirements.txt
```

#Realizar creación de modelos, poblado y migración de BD:

Dirigirse a la carpeta duoc_djangoanular

```
python manage.py migrate
```

Luego de ver el output con los mensajes de OK, dirigirse a MongoDB compass para comprobar la correcta creación de la base de datos y sus datos predefinidos:

ya que estamos trabajando con la DB local solo hace falta darle conexion con los datos default que aparecen:

![1686521026874](image/README/1686521026874.png)

Una vez le damos connect deberiamos poder ver la base de datos creada y estaria terminado nuestro setup del backend

![1682278928902](image/README/1682278928902.png)

# Instalación de dependencias FrontEnd

Luego de instalar los requerimientos de django instalar Angular

```
npm install -g @angular/cli
```

Dirigirse a carpeta de duoc_angularfrontend

```
npm install
```

# Lanzamiento de programa

una vez instalados front y back end, abrir 2 consolas en la terminal de su eleccion.

Para iniciar el Backend seguir los siguientes pasos.

Desde el root del proyecto realizar

```
cd duoc_djangoangular/
```

Verificar con comandos LS o DIR que estamos bien en la carpeta donde esta manage.py

![1686521474869](image/README/1686521474869.png)

una vez dentro ejecutar el siguiente comando:

```
python manage.py runserver
```

![1686521555470](image/README/1686521555470.png)Si todo fue instalado de manera correcta deberia ver una imagen que se asemeje a la siguiente, con su servidor andando en el puerto 8000.

Ahora toca inicializar el FrontEnd desde la otra terminal en la carpeta root.

```
cd duoc_djangoangular/duoc_angularfrontend/
```

una vez dentro ejecutar el comando

```
ng serve
```

Si se siguieron de manera correcta los previos pasos de instalacion deberia de verse asi su terminal:
![1686521740716](image/README/1686521740716.png)

Su servidor esta andando en el puerto 4200, si luego escribe en su navegador "http://localhost:4200/" sera enviado a la pagina de inicio de sesion.

![1686521827508](image/README/1686521827508.png)
