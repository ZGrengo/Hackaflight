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

| Campo      | Tipo         | Descripción                                 |
| ---------- | ------------ | ------------------------------------------- |
| userId     | INT UNSIGNED | Identificador único del usuario             |
| username   | VARCHAR(30)  | Nombre de usuario                           |
| firstname  | VARCHAR(50)  | Nombre real del usuario                     |
| lastname   | VARCHAR(100) | Apellidos del usuario                       |
| email      | VARCHAR(100) | Correo electrónico del usuario              |
| password   | VARCHAR(100) | Contraseña del usuario (hash)               |
| birthdate  | DATE         | Fecha de nacimiento                         |
| avatar     | VARCHAR(100) | URL del avatar del usuario                  |
| role       | ENUM         | Rol del usuario ('admin', 'normal')         |
| payMethod  | ENUM         | Método de pago ('Visa', 'Paypal', 'Wallet') |
| createdAt  | DATETIME     | Fecha de creación                           |
| modifiedAt | DATETIME     | Fecha de última modificación                |

### airports

| Campo     | Tipo         | Descripción                        |
| --------- | ------------ | ---------------------------------- |
| airportId | INT UNSIGNED | Identificador único del aeropuerto |
| name      | VARCHAR(70)  | Nombre del aeropuerto              |
| city      | VARCHAR(70)  | Ciudad donde se encuentra          |
| country   | VARCHAR(70)  | País del aeropuerto                |
| createdAt | DATETIME     | Fecha de creación del registro     |

### flies

| Campo      | Tipo         | Descripción                    |
| ---------- | ------------ | ------------------------------ |
| flyId      | INT UNSIGNED | Identificador único del vuelo  |
| codeFly    | INT UNSIGNED | Código de vuelo                |
| airline    | INT UNSIGNED | Identificador de la aerolínea  |
| origin     | INT UNSIGNED | ID de la ciudad de origen      |
| destiny    | INT UNSIGNED | ID de la ciudad de destino     |
| scales     | INT UNSIGNED | Número de escalas              |
| arrivals   | DATETIME     | Fecha y hora de llegada        |
| departures | DATETIME     | Fecha y hora de salida         |
| price      | SMALLINT     | Precio del vuelo               |
| createdAt  | DATETIME     | Fecha de creación del registro |

### bookings

| Campo       | Tipo         | Descripción                                                   |
| ----------- | ------------ | ------------------------------------------------------------- |
| bookingId   | INT UNSIGNED | Identificador único de la reserva                             |
| userId      | INT UNSIGNED | Identificador del usuario que reserva                         |
| flyId       | INT UNSIGNED | Identificador del vuelo reservado                             |
| reserveDate | DATETIME     | Fecha de la reserva                                           |
| title       | VARCHAR(50)  | Título de la reserva                                          |
| origin      | INT UNSIGNED | Ciudad de origen                                              |
| destiny     | INT UNSIGNED | Ciudad de destino                                             |
| scales      | INT UNSIGNED | Número de escalas                                             |
| place       | VARCHAR(30)  | Asiento reservado                                             |
| description | TEXT         | Descripción de la reserva                                     |
| luggage     | TINYINT(30)  | Cantidad de equipaje                                          |
| class       | ENUM         | Clase del vuelo ('FirstClass', 'EconomyClass', 'TuristClass') |
| extras      | TINYINT(1)   | Indica si hay extras adicionales en la reserva                |
| createdAt   | DATETIME     | Fecha de creación                                             |
| modifiedAt  | DATETIME     | Fecha de última modificación                                  |

### valorations

| Campo         | Tipo         | Descripción                            |
| ------------- | ------------ | -------------------------------------- |
| valorationId  | INT UNSIGNED | Identificador único de la valoración   |
| userId        | INT UNSIGNED | Identificador del usuario que valoró   |
| Experience    | ENUM         | Experiencia ('good', 'neutral', 'bad') |
| Rate          | ENUM         | Puntuación ('1', '2', '3', '4', '5')   |
| Recomentation | ENUM         | Recomendación ('yes', 'no')            |
| comment       | VARCHAR(600) | Comentario sobre la experiencia        |
| createdAt     | DATETIME     | Fecha de creación                      |

## Endpoints del usuario

- **POST** - [`/api/users/register`] - Crea un nuevo usuario.
- **POST** - [`/api/users/login`] - Inicia sesión y retorna un token.
- **GET** - [`/api/users/profile`] - Obtiene la información del usuario autenticado.
- **PUT** - [`/api/users/profile`] - Actualiza el perfil del usuario autenticado.
- **PUT** - [`/api/users/password/reset`] - Permite enviar un email de recuperación de contraseña.
- **PUT** - [`/api/users/password/reset/:recoverPassCode`] - Permite cambiar la contraseña con un código.
- **GET** - [`/api/users/favorites`] - Lista los criterios de búsqueda guardados como favoritos.
- **POST** - [`/api/users/favorites`] - Guarda un criterio de búsqueda como favorito.
- **DELETE** - [`/api/users/favorites/:id`] - Elimina un criterio de búsqueda favorito.

## Endpoints de vuelos

- **GET** - [`/api/flights/search`] - Busca vuelos con filtros de origen, destino y fecha.
- **GET** - [`/api/flights/:flyId`] - Obtiene detalles de un vuelo específico.

## Endpoints de valoraciones

- **POST** - [`/api/ratings`] - Agregar una valoración a la plataforma.
- **GET** - [`/api/ratings`] - Listar todas las valoraciones.

## Endpoints administrativos

- **GET** - [`/api/admin/users`] - Lista todos los usuarios (requiere permisos de administrador).
- **PUT** - [`/api/admin/users/:id/status`] - Habilita / deshabilita un usuario.
- **DELETE** - [`/api/admin/users/:id/delete`] - Elimina un usuario de la plataforma.

## Funcionalidades extra

- **PUT** - [`/api/users/update-service`] - Actualización de criterios de búsqueda guardados.
- **GET** - [`/api/users/sorted-services`] - Ordenaciones en la lista de criterios guardados.
- **Middleware** - Validación de datos con Joi para asegurar la calidad de la información enviada en las solicitudes.

Este proyecto está desarrollado en **Node.js con Express** y utiliza **MySQL** como base de datos. 🚀
