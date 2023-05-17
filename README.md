# challenge
----

En este challenge se desarrolló un frontend que consume datos de un API (backend). Ambos desarrollados para este fin.
El frontend muestra la información obtenida de la API respetando las pautas descriptas en el [documento de requerimientos](https://github.com/rjermou/toolbox/blob/main/challenge.pdf).


### Ejecución con docker-compose

Estando en el directorio (/toolbox/) donde se encuentra el archivo docker-compose.yml ejecutar:
`docker-compose up --build`

Esto levanta una api node para el back (http://localhost:3031) y una app react con nginx (http://localhost:3000)

----
# BACKEND: ms-files

El ms-files nos permitirá recuperar información sobre archivos csv.
----
## Stack de desarrollo
- node.js, npm
- mocha, chai, sinon — tests unitarios
- express
- axios - http
- joi — validación de objetos
- nyc - reporte de cobertura

### Versión de node
  Utiliza la última LTS (18.15.0).

----
## Convenciones de código
### Estilo de código
  Utiliza la guía de estilos de [standard.js](https://standardjs.com/).

  Para ejecución (instalado de manera global): `standard`

## Estructura de carpetas
Basada en estructura propuesta por Arquitectura Hexagonal
```bash
.
├── docs/                # Documentación adicional del repo
├── config/              # Archivos de configuración y/o properties
├── scripts/             # Scripts que facilitan tareas de desarrollo, testing y/o despliegue
├── src/                 # Contiene código fuente
|   ├── application      # Capa de aplicación
|   |   ├── controllers  # Controladores
|   |   ├── dictionaries # Constantes, propiedades, errores, etc. necesarios para esta capa
|   |   ├── request      # Formato de Peticiones (Validación de requests)
|   |   ├── routes       # Rutas
|   ├── domain           # Dominio: Entidades, lógica de neocio, etc...
|   |   ├── services     # Servicios
|   |   ├── use_cases    # Casos de usos por servicios
|   ├── infraestructure  # Servicios (infraestrucutra)
|   |   ├── dictionaries # Diccionario para errores, traductores de peticiones y respuestas
|   |   ├── httpServices # Manejo de peticiones http
├── test/                # Directorio que contiene los archivos de pruebas
|   ├── unit/            # Archivos de Pruebas unitarias
```

## Testing unitario

Para correr los casos de prueba: `npm test` ó `npm run test`

Para crear el reporte de coverage: `npm run coverage`
El reporte se encuentra en ./coverage/lcov-report/index.html


## Documentación (swagger)

Ejecutando la aplicación la documentación de la API estará disponible en **http:localhost:3031/api-docs**
Tambien, en el directorio /toolbox/back/ms-files/postman, se encuentra una postman collection.

----
## ¿Cómo Comenzar?

### Pre-requisitos
- Tener instalado Node JS

### Ejecución
- Clonar el repositorio
- Instalar dependencias: `npm install`
- Iniciar el servidor: `npm start`
----

### Ejecución en docker

*Pre-Requisitos:* Tener instalado docker.

Los comando deben ejecutarse estando en el directorio donde se encuentra el archivo Dockerfile. (/toolbox/back/ms-files)

Para construir la imágen:
`docker build . -t <username>/ms-files`

Para correrla:
`docker run -p 3031:3031 -d <username>/ms-files`

Para probarla:
Hacer una petición a http://localhost:3031/files/list
----


# FRONTEND: front-files

La app nos permitirá listar el contenido de los archivos .csv.

----
## Stack de desarrollo
- node.js, npm
- react, react-bootstrap

La app fue creada con [Create React App](https://github.com/facebook/create-react-app).

----
## ¿Cómo Comenzar?

### Pre-requisitos
- Tener instalado Node JS

### Ejecución
- Clonar el repositorio
- Instalar dependencias: `npm install`
- Iniciar el servidor: `npm start`

----
### Ejecución en docker

*Pre-Requisitos:* Tener instalado docker.

Los comando deben ejecutarse estando en el directorio donde se encuentra el archivo Dockerfile. (/toolbox/front/files-front)

Para construir la imágen:
`docker build . -t <username>/files-front`

Para correrla:
`docker run -p 3000:80 -d <username>/files-front`

Para probarla:
Abrir el browser en http://localhost:3000
