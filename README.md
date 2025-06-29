# Proyecto Final Backend 3 - Adoptme

Este es el proyecto final del curso de Backend 3, una aplicación para la adopción de mascotas.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Swagger para documentación
- Docker para contenerización

## Configuración con Docker

### Construir y ejecutar con Docker Compose

```bash
# Construir y ejecutar la aplicación
docker-compose up

# Ejecutar en segundo plano
docker-compose up -d

# Detener la aplicación
docker-compose down
```

### Construir la imagen manualmente

```bash
docker build -t backend3-proyecto-final-adoptme .
```

### Ejecutar el contenedor manualmente

```bash
docker run -p 8080:8080 backend3-proyecto-final-adoptme
```

## Subir la imagen a Docker Hub

```bash
# Iniciar sesión en Docker Hub
docker login

# Etiquetar la imagen con tu nombre de usuario
docker tag backend3-proyecto-final-adoptme TU_USUARIO/backend3-proyecto-final-adoptme:latest

# Subir la imagen a Docker Hub
docker push TU_USUARIO/backend3-proyecto-final-adoptme:latest
```

## Descargar la imagen desde Docker Hub

La imagen está disponible en Docker Hub y puede ser descargada con el siguiente comando:

```bash
docker pull arinoc/backend3-proyecto-final-adoptme
```

Para ejecutar un contenedor usando esta imagen:

```bash
docker run -p 8080:8080 arinoc/backend3-proyecto-final-adoptme
```

## Acceder a la aplicación

Una vez que la aplicación esté en ejecución, puedes acceder a:

- API: http://localhost:8080
- Documentación Swagger: http://localhost:8080/api-docs
