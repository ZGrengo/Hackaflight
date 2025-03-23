✈️ HackaFlight - Plataforma de búsqueda y gestión de vuelos

HackaFlight es una plataforma web full stack que permite a los usuarios buscar vuelos en tiempo real, guardar búsquedas favoritas y gestionar reservas de manera eficiente. El sistema consume la API de Amadeus para obtener información actualizada de vuelos y está diseñado con un enfoque en rendimiento, seguridad y experiencia de usuario.

📌 Tecnologías utilizadas:

🔹 Frontend: React.js, Tailwind CSS → Interfaz moderna, intuitiva y responsive.

🔹 Backend: Node.js, Express.js → API robusta para la gestión de vuelos.

🔹 Base de datos: MySQL → Almacenamiento estructurado y eficiente.

🔹 Autenticación: JWT, bcrypt → Seguridad en el acceso de usuarios.

🔹 API externa: Amadeus API → Obtención de información de vuelos en tiempo real.

🔹 Metodologías: Scrum, Scrumban → Desarrollo ágil y trabajo en equipo.


🚀 Características principales

✔️ Búsqueda avanzada de vuelos con filtros de origen, destino y fechas.

✔️ Comparación de precios y aerolíneas en tiempo real.

✔️ Gestión de reservas con confirmaciones automáticas.

✔️ Sistema de autenticación seguro con encriptación de contraseñas.

✔️ Funcionalidad de favoritos para guardar búsquedas recurrentes.

✔️ Valoraciones de usuarios para evaluar la experiencia en la plataforma.

✔️ Diseño responsive para una experiencia fluida en todos los dispositivos.



💻 Dependencias

🚀 Instalación Server

1. Instalar las dependencias con el comando:
    ```sh
    npm install
    ```
2. Copiar el archivo `.env.example` y renombrarlo como `.env`, luego completar los datos necesarios.
3. Ejecutar el siguiente comando para crear las tablas en la base de datos:
    ```sh
    npm run initdb
    ```
4. Iniciar el servidor en modo desarrollo con:
    ```sh
    npm run dev
    ```

🚀 Instalación Cliente

1. Instalar las dependencias con el comando:
    ```sh
    npm install
    ```
2. Copiar el archivo `.env.example` y renombrarlo como `.env`, luego completar los datos necesarios.
3. Iniciar el cliente en modo desarrollo con:
    ```sh
    npm run dev
    ```

🛢 Modelo de Base de Datos

🔹 Usuarios: Gestión de cuentas, roles y autenticación segura.

🔹 Favoritos: Permite a los usuarios guardar criterios de búsqueda de vuelos.

🔹 Reservas: Administración de vuelos reservados por los usuarios.

🔹 Valoraciones: Sistema de feedback con puntuaciones y comentarios.


👋 users

| Campo           | Tipo         | Descripción                          |
| --------------- | ------------ | ------------------------------------ |
| userId          | INT UNSIGNED | Identificador único del usuario      |
| username        | VARCHAR(30)  | Nombre de usuario                    |
| firstName       | VARCHAR(50)  | Nombre real del usuario              |
| lastName        | VARCHAR(100) | Apellidos del usuario                |
| email           | VARCHAR(100) | Correo electrónico del usuario       |
| password        | VARCHAR(100) | Contraseña del usuario (hash)        |
| regCode         | CHAR(30)     | Código de registro                   |
| recoverPassCode | CHAR(30)     | Código de recuperación de contraseña |
| birthdate       | DATE         | Fecha de nacimiento                  |
| avatar          | VARCHAR(100) | URL del avatar del usuario           |
| role            | ENUM         | Rol del usuario ('admin', 'normal')  |
| active          | BOOLEAN      | Indica si el usuario está activo     |
| createdAt       | DATETIME     | Fecha de creación                    |
| modifiedAt      | DATETIME     | Fecha de última modificación         |

⭐ favorites

| Campo         | Tipo         | Descripción                               |
| ------------- | ------------ | ----------------------------------------- |
| favoriteId    | INT UNSIGNED | Identificador único del criterio favorito |
| userId        | INT UNSIGNED | Identificador del usuario                 |
| title         | VARCHAR(100) | Título personalizado por el usuario       |
| origin        | VARCHAR(3)   | Código IATA del origen                    |
| destination   | VARCHAR(3)   | Código IATA del destino                   |
| departureDate | DATE         | Fecha de salida                           |
| returnDate    | DATE         | Fecha de regreso                          |
| adults        | TINYINT(5)   | Número de adultos en la búsqueda          |
| createdAt     | DATETIME     | Fecha de creación del registro            |

💙 ratings

| Campo        | Tipo         | Descripción                          |
| ------------ | ------------ | ------------------------------------ |
| valorationId | INT UNSIGNED | Identificador único de la valoración |
| userId       | INT UNSIGNED | Identificador del usuario que valoró |
| title        | VARCHAR(100) | Título de la valoración              |
| rate         | ENUM         | Puntuación ('1', '2', '3', '4', '5') |
| comment      | VARCHAR(600) | Comentario sobre la experiencia      |
| createdAt    | DATETIME     | Fecha de creación                    |

📡 Endpoints principales

🔹 Usuarios

✅ POST /api/users/register → Registro de nuevos usuarios.

✅ POST /api/users/login → Inicio de sesión con JWT.

✅ GET /api/users/profile → Obtiene la información del usuario autenticado.


🔹 Vuelos

✅ GET /api/flights/search → Búsqueda de vuelos con filtros avanzados.

✅ GET /api/flights/details/:id → Detalles de un vuelo específico.


🔹 Favoritos y reservas

✅ POST /api/users/favorites → Guardar un criterio de búsqueda.

✅ GET /api/users/favorites → Listar favoritos guardados.

✅ POST /api/users/reservations → Registrar una reserva de vuelo.

✅ GET /api/users/reservations → Obtener todas las reservas de un usuario.


🚀 Estado del proyecto

📌 MVP completado.

📌 Posibles mejoras: Integración de vinculos a las aerolineas, optimización de rendimiento, nuevas APIs.

