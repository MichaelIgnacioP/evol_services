# Crear Base De Datos PostgreSQL 

`CREATE DATABASE evol_services;`

`CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    rut TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL
);
`

`CREATE TABLE medidores (
    id SERIAL PRIMARY KEY,
    codigo TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    fecha_creacion DATE NOT NULL,
    descripcion TEXT,
    cliente_id INT REFERENCES clientes (id) ON DELETE CASCADE
);
`

# API de Gestión de Clientes y Medidores 
Esta es una API simple para la gestión de clientes y medidores. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) tanto para clientes como para medidores.

# Tecnologías Utilizadas 
Node.js
Express.js
PostgreSQL
Cors (para habilitar CORS en las solicitudes)

# Configuración
Clona este repositorio en tu máquina local.

Crea un archivo .env en la raíz del proyecto y configura las siguientes variables de entorno:

``` PORT=8080
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=tu_bdd
DB_PASSWORD=tu_password
DB_PORT=5432
```

recuerda reemplazar tu_bdd y tu_password por tus credenciales de tu base de datos PostgreSQL.

# Instala las dependencias del proyecto:

``` npm install```

# Inicia el servidor:

``` npm start
```

# Endpoints
## Clientes

# Listar todos los clientes

```URL: /api/clientes
Método HTTP: GET
Descripción: Devuelve una lista de todos los clientes en la base de datos.
Respuesta Exitosa (200 OK): JSON con la lista de clientes.
Respuesta de Error (500 Internal Server Error): JSON con un mensaje de error en caso de fallo en el servidor.
```

# Crear un nuevo cliente

```URL: /api/clientes
Método HTTP: POST
Descripción: Crea un nuevo cliente en la base de datos.
Cuerpo de la Solicitud (JSON): { "rut": "12345678-9", "nombre": "Nombre del Cliente", "direccion": "Dirección del Cliente" }
Respuesta Exitosa (201 Created): JSON con los detalles del cliente creado.
Respuesta de Error (400 Bad Request o 500 Internal Server Error): JSON con un mensaje de error en caso de problemas en la solicitud o en el servidor.
```

# Actualizar un cliente por ID

```URL: /api/clientes/:id
Método HTTP: PUT
Descripción: Actualiza un cliente existente en la base de datos por su ID.
Cuerpo de la Solicitud (JSON): { "rut": "12345678-9", "nombre": "Nuevo Nombre", "direccion": "Nueva Dirección" }
Respuesta Exitosa (200 OK): JSON con los detalles del cliente actualizado.
Respuesta de Error (400 Bad Request, 404 Not Found o 500 Internal Server Error): JSON con un mensaje de error en caso de problemas en la solicitud, cliente no encontrado o en el servidor.
```

# Eliminar un cliente por ID

```URL: /api/clientes/:id
Método HTTP: DELETE
Descripción: Elimina un cliente existente de la base de datos por su ID.
Respuesta Exitosa (200 OK): JSON con un mensaje de éxito.
Respuesta de Error (404 Not Found o 500 Internal Server Error): JSON con un mensaje de error en caso de cliente no encontrado o en el servidor.
```

# Medidores
## Listar todos los medidores

```URL: /api/medidores
Método HTTP: GET
Descripción: Devuelve una lista de todos los medidores en la base de datos.
Respuesta Exitosa (200 OK): JSON con la lista de medidores.
Respuesta de Error (500 Internal Server Error): JSON con un mensaje de error en caso de fallo en el servidor.
```

# Crear un nuevo medidor

```URL: /api/medidores
Método HTTP: POST
Descripción: Crea un nuevo medidor en la base de datos.
Cuerpo de la Solicitud (JSON): { "codigo": "M001", "nombre": "Nombre del Medidor", "fechaCreacion": "2023-10-10", "descripcion": "Descripción del Medidor", "clienteId": 1 }
Respuesta Exitosa (201 Created): JSON con los detalles del medidor creado.
Respuesta de Error (400 Bad Request o 500 Internal Server Error): JSON con un mensaje de error en caso de problemas en la solicitud o en el servidor.
```

# Actualizar un medidor por ID

```URL: /api/medidores/:id
Método HTTP: PUT
Descripción: Actualiza un medidor existente en la base de datos por su ID.
Cuerpo de la Solicitud (JSON): { "codigo": "M002", "nombre": "Nuevo Nombre", "fechaCreacion": "2023-10-11", "descripcion": "Nueva Descripción" }
Respuesta Exitosa (200 OK): JSON con los detalles del medidor actualizado.
Respuesta de Error (400 Bad Request, 404 Not Found o 500 Internal Server Error): JSON con un mensaje de error en caso de problemas en la solicitud, medidor no encontrado o en el servidor.
```

# Eliminar un medidor por ID

```URL: /api/medidores/:id
Método HTTP: DELETE
Descripción: Elimina un medidor existente de la base de datos por su ID.
Respuesta Exitosa (200 OK): JSON con un mensaje de éxito.
Respuesta de Error (404 Not Found o 500 Internal Server Error): JSON con un mensaje de error en caso de medidor no encontrado o en el servidor.
```



