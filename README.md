# Android API

Esta API, ha sido desarrollada por un equipo de estudiantes del Tecnológico de Monterrey en colaboración con la organización socio formadora “FRISA”, como parte de un proyecto académico. 


## Descripción 

La API está diseñada para manejar la comunicación entre la aplicación "FrisaAppAndroid" y su base de datos alojada en MongoDB. La base de datos contiene varios modelos clave que son fundamentales para el funcionamiento de la aplicación.

1. Modelo de Organización: Este modelo almacena información detallada sobre las organizaciones registradas en la aplicación.
2. Modelo de Usuario: Almacena información sobre los usuarios de la aplicación.
3. Modelo de Publicaciones: Este modelo almacena todas las publicaciones realizadas por las organizaciones registradas. 
4. Modelo de Correos Permitidos: Este modelo gestiona los correos electrónicos permitidos que pueden acceder a la aplicación.

La API también proporciona rutas y funciones para toda la funcionalidad de la aplicación. Está diseñada para ser segura y eficiente, y garantiza una comunicación fluida entre la aplicación y la base de datos MongoDB para proporcionar una experiencia de usuario óptima.


## URL de la Aplicacion

https://github.com/KarenGtzSolis/APPFRISA2.0.git


## Instalación 

Para descargar este proyecto, siga los siguientes pasos:


1. Descargue e instale las dependencias:
	Node.js: Descarga e instala Node.js desde https://nodejs.org/.
	MongoDB: Sigue las instrucciones de instalación de MongoDB desde https://docs.mongodb.com/manual/installation/.

2. Clone el repositorio:
	Para clonar el repositorio de la API ejecute el siguiente comando: git clone https://github.com/carotopia/APIFrisa

3. Configure la conexión a MongoDB:
	Edite el archivo config.js en el repositorio clonado para configurar la conexión a la base de datos MongoDB.

4. Instale dependencias de Node.js:
	En la terminal, navega al directorio del repositorio clonado: cd APIFrisa
	Luego, instala las dependencias con: npm install

5. Ejecute la API; inicia la API con: npm start
