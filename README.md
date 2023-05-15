# challenge
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

----
## ¿Cómo Comenzar?

### Pre-requisitos
- Tener instalado Node JS

### Ejecución
- Clonar el repositorio
- Instalar dependencias: `npm install`
- Iniciar el servidor: `npm start`
----

# FRONTEND:

