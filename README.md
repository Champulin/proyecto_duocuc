# proyecto_duocuc

Proyecto de titulo DuocUC 2023

Pre-requisitos:

Haber realizado guia de instalacion de Mongo y creacion de base de datos: README_MONGO.md

Tener instalado Pip, Python, MongoDB, Node JS

Intrucciones de levantamiento de ambientes de desarrollo:

#Todos los comandos son a ejecutar en la linea de comandos cmd.

#con la terminal de comandos en el root del proyecto

#Instalar ambiente virtual

```
pip install virtualenv
```

#Crear ambiente virtual el nombre es opcional, si se crea uno que no sea "nombre_env" cambiar por su respectivo nombre

```
virtualenv nombre_env
```

#Activar ambiente virtual --este comando debera reejecutarse cada vez que se quiera lanzar django, todas las instalaciones subsiguientes se realizaran con el env activado

```
nombre_env\Scripts\activate
```

#una vez activado, la terminal deberia verse asi (nombre_env)path\to\project\proyecto_duocuc>, siento "path\to\project" la ruta de su computador hacia el proyecto clonado.

#instalacion requerimientos del proyecto

```
pip install -r requirements.txt
```

#Realizar creacion de modelos, poblado y migracion de BD:

Dirigirse a la carpeta duoc_djangoanular

#luego de instalar los requerimientos de django instalar Angular

```
npm install -g @angular/cli
```

Dirigirse a carpeta de duoc_angularfrontend

```
npm install
```
