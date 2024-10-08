# ControlVentasApp-Evaluacion

## Instalación y Ejecución

Este proyecto utiliza Docker Compose para facilitar la instalación y ejecución. Sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

2. Clona el repositorio del proyecto:
   ```
   git clone https://github.com/SDDrouet/ControlVentasApp-Evaluacion.git
   cd ControlVentasApp-Evaluacion
   ```

3. En la raíz del proyecto, donde se encuentra el archivo `docker-compose.yml`, ejecuta:
   ```
   docker-compose up --build -d
   ```

   Esto construirá las imágenes de los servicios (si es necesario) y luego iniciará los contenedores en modo detached.

4. Para verificar que los servicios están corriendo, puedes usar:
   ```
   docker-compose ps
   ```

5. Para detener los servicios, ejecuta:
   ```
   docker-compose down
   ```

Ahora deberías poder acceder a los endpoints de los microservicios como se describe a continuación, la interfaz de usuario se puede acceder desde.
  ```
  `http://localhost:3000/`
  ```

## Endpoints

1. Microservicio de Inventario:
   `http://localhost:3001/api/inventario`

2. Microservicio de Clientes:
   `http://localhost:3002/api/clientes`

3. Microservicio de Ventas:
   `http://localhost:3003/api/ventas`

## Operaciones CRUD

Para cada microservicio, puedes realizar las siguientes operaciones:

### GET (Leer)

- Obtener todos los registros:
  ```
  GET http://localhost:300X/api/SERVICIO
  ```
- Obtener un registro específico:
  ```
  GET http://localhost:300X/api/SERVICIO/ID
  ```

### POST (Crear)

- Crear un nuevo registro:
  ```
  POST http://localhost:300X/api/SERVICIO
  Content-Type: application/json

  {
    // Datos del nuevo registro
  }
  ```

### PUT (Actualizar)

- Actualizar un registro existente:
  ```
  PUT http://localhost:300X/api/SERVICIO/ID
  Content-Type: application/json

  {
    // Datos actualizados
  }
  ```

### DELETE (Eliminar)

- Eliminar un registro:
  ```
  DELETE http://localhost:300X/api/SERVICIO/ID
  ```

Nota: Reemplaza `300X` con el puerto correspondiente (3001 para Inventario, 3002 para Clientes, 3003 para Ventas) y `SERVICIO` con el nombre del servicio (inventario, clientes, ventas).

## Notas adicionales

- Asegúrate de que los puertos 3001, 3002 y 3003 estén disponibles en tu sistema.
- Si necesitas realizar cambios en la configuración, puedes editar el archivo `docker-compose.yml`.
- Para ver los logs de los servicios, puedes usar `docker-compose logs -f`.

