# HackaFlight

HackaFlight es una plataforma para la búsqueda de vuelos, donde los usuarios pueden registrar cuentas, buscar vuelos, guardar búsquedas favoritas y gestionar sus reservas de manera eficiente.

## 🚀 Instalación

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

## Base de datos

### users

 Campo            | Tipo         | Descripción                         |
| --------------- | ------------ | ------------------------------------|
| userId          | INT UNSIGNED | Identificador único del usuario     |
| username        | VARCHAR(30)  | Nombre de usuario                   |
| firstName       | VARCHAR(50)  | Nombre real del usuario             |
| lastName        | VARCHAR(100) | Apellidos del usuario               |
| email           | VARCHAR(100) | Correo electrónico del usuario      |
| password        | VARCHAR(100) | Contraseña del usuario (hash)       |
| regCode         | CHAR(30)     | Código de registro                  |
| recoverPassCode | CHAR(30)     | Código de recuperación de contraseña|
| birthdate       | DATE         | Fecha de nacimiento                 |
| avatar          | VARCHAR(100) | URL del avatar del usuario          |
| role            | ENUM         | Rol del usuario ('admin', 'normal') |
| active          | BOOLEAN      | Indica si el usuario está activo    |
| createdAt       | DATETIME     | Fecha de creación                   |
| modifiedAt      | DATETIME     | Fecha de última modificación        |

### favorites

| Campo          | Tipo         | Descripción                               |
| -------------- | ------------ | ------------------------------------------|
| favoriteId     | INT UNSIGNED | Identificador único del criterio favorito |
| userId         | INT UNSIGNED | Identificador del usuario                 |
| title          | VARCHAR(100) | Título personalizado por el usuario       |
| origin         | VARCHAR(3)   | Código IATA del origen                    |
| destination    | VARCHAR(3)   | Código IATA del destino                   |
| departureDate  | DATE         | Fecha de salida                           |
| returnDate     | DATE         | Fecha de regreso                          |
| adults         | TINYINT(5)   | Número de adultos en la búsqueda          |
| createdAt      | DATETIME     | Fecha de creación del registro            |

### valorations

| Campo         | Tipo         | Descripción                                |
| ------------- | ------------ | ------------------------------------------ |
| valorationId  | INT UNSIGNED | Identificador único de la valoración       |
| userId        | INT UNSIGNED | Identificador del usuario que valoró       |
| title         | VARCHAR(100) | Título de la valoración                    |
| rate          | ENUM         | Puntuación ('1', '2', '3', '4', '5')       |
| comment       | VARCHAR(600) | Comentario sobre la experiencia            |
| createdAt     | DATETIME     | Fecha de creación                          |

## Endpoints del usuario

-   **POST** - [`/api/users/register`] - Crea un nuevo usuario.
-   **POST** - [`/api/users/login`] - Inicia sesión y retorna un token.
-   **GET** - [`/api/users/profile`] - Obtiene la información del usuario autenticado.
-   **PUT** - [`/api/users/profile`] - Actualiza el perfil del usuario autenticado.
-   **PUT** - [`/api/users/password/reset`] - Permite enviar un email de recuperación de contraseña.
-   **PUT** - [`/api/users/password/reset/:recoverPassCode`] - Permite cambiar la contraseña con un código.
-   **GET** - [`/api/users/favorites`] - Lista los criterios de búsqueda guardados como favoritos.
-   **POST** - [`/api/users/favorites`] - Guarda un criterio de búsqueda como favorito.
-   **DELETE** - [`/api/users/favorites/:id`] - Elimina un criterio de búsqueda favorito.
-   **POST** - [`/api/ratings`] - Agregar una valoración a la plataforma.

## Endpoints de vuelos

-   **GET** - [`/api/flights/search`] - Busca vuelos con filtros de origen, destino y fecha.
-   **GET** - [`/api/flights/:flyId`] - Obtiene detalles de un vuelo específico.

## Endpoints de valoraciones

-   **GET** - [`/api/user/ratings`] - Listar todas las valoraciones.

## Endpoints administrador/a

-   **GET** - [`/api/admin/users`] - Lista todos los usuarios (requiere permisos de administrador).
-   **PUT** - [`/api/admin/users/:id/status`] - Habilita / deshabilita un usuario.
-   **DELETE** - [`/api/admin/users/:id/`] - Elimina un usuario de la plataforma.

## Funcionalidades extra

-   **PUT** - [`/api/users/update-service`] - Actualización de criterios de búsqueda guardados.
-   **GET** - [`/api/users/sorted-services`] - Ordenaciones en la lista de criterios guardados.
-   **Middleware** - Validación de datos con Joi para asegurar la calidad de la información enviada en las solicitudes.

Este proyecto está desarrollado en **Node.js con Express** y utiliza **MySQL** como base de datos. 🚀
