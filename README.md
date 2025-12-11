# ✈️ HackaFlight - Plataforma de búsqueda y gestión de vuelos

HackaFlight es una plataforma web full stack que permite a los usuarios buscar vuelos en tiempo real, guardar búsquedas favoritas y gestionar reservas de manera eficiente. El sistema consume la API de Amadeus para obtener información actualizada de vuelos y está diseñado con un enfoque en rendimiento, seguridad y experiencia de usuario.

---

## 📑 Índice

- [Tecnologías utilizadas](#-tecnologías-utilizadas)
- [Características principales](#-características-principales)
- [Imagenes de muestra](#-imágenes-de-muestra)
    - [Vista Desktop](#-vista-desktop)
    - [Vista Mobile](#-vista-mobile)
- [Instalación](#-instalación)
  - [Instalación del Servidor](#-instalación-del-servidor)
  - [Instalación del Cliente](#-instalación-del-cliente)
- [Modelo de Base de Datos](#-modelo-de-base-de-datos)
  - [Tabla: users](#-tabla-users)
  - [Tabla: favorites](#-tabla-favorites)
  - [Tabla: ratings](#-tabla-ratings)
- [API - Endpoints principales](#-api---endpoints-principales)
  - [Usuarios](#-usuarios)
  - [Vuelos](#-vuelos)
  - [Favoritos y Reservas](#-favoritos-y-reservas)
- [Estado del proyecto](#-estado-del-proyecto)

---

## 📌 Tecnologías utilizadas

### Frontend
- **React.js** - Biblioteca de JavaScript para construir interfaces de usuario
- **Tailwind CSS** - Framework de CSS utility-first para diseño moderno y responsive
- **Vite** - Herramienta de construcción rápida para desarrollo frontend

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js

### Base de datos
- **MySQL** - Sistema de gestión de bases de datos relacional

### Seguridad y Autenticación
- **JWT (JSON Web Tokens)** - Autenticación basada en tokens
- **bcrypt** - Encriptación de contraseñas

### APIs externas
- **Amadeus API** - API para obtener información de vuelos en tiempo real

### Metodologías
- **Scrum / Scrumban** - Metodologías ágiles para desarrollo y trabajo en equipo

---

## 🚀 Características principales

- ✅ **Búsqueda avanzada de vuelos** con filtros de origen, destino y fechas
- ✅ **Comparación de precios y aerolíneas** en tiempo real
- ✅ **Gestión de reservas** con confirmaciones automáticas
- ✅ **Sistema de autenticación seguro** con encriptación de contraseñas
- ✅ **Funcionalidad de favoritos** para guardar búsquedas recurrentes
- ✅ **Sistema de valoraciones** para evaluar la experiencia en la plataforma
- ✅ **Diseño responsive** para una experiencia fluida en todos los dispositivos
- ✅ **Panel de administración** para gestión de usuarios

---

## 📸 Imágenes de Muestra

A continuación se muestran capturas de pantalla de la plataforma en diferentes dispositivos y funcionalidades:

### 🖥️ Vista Desktop

#### Página de Inicio

![Página de Inicio - Desktop](https://github.com/user-attachments/assets/362dca49-1a47-4387-83a6-b3a71cccc296)
_Interfaz principal de HackaFlight con búsqueda de vuelos y destinos populares_

#### Búsqueda de Favoritos

![Búsqueda de Favoritos - Desktop](https://github.com/user-attachments/assets/23fb4449-cc81-422b-860b-2af993b4edf2)
_Gestión de búsquedas favoritas guardadas por el usuario_

#### Resultados de Búsqueda

![Resultados de Búsqueda - Desktop](https://github.com/user-attachments/assets/712317a5-7312-4214-a605-2d62fe5e9e6e)
_Vista de resultados de búsqueda con filtros y opciones de vuelos disponibles_

### 📱 Vista Mobile

#### Edición de Favoritos

![Edición de Favoritos - Mobile](https://github.com/user-attachments/assets/aed1095d-6dac-490b-91e9-d2400348f302)

_Interfaz móvil para editar búsquedas favoritas guardadas_

#### Sistema de Valoraciones

![Valoraciones - Mobile](https://github.com/user-attachments/assets/6a7b5379-0d34-4048-b330-b6f70d1f365e)

_Sistema de valoraciones y comentarios en versión móvil_

#### Búsqueda de Vuelos

![Búsqueda de Vuelos - Mobile](https://github.com/user-attachments/assets/24fba57b-ce2b-47bd-93a3-1e2d1e5ab0cc)

_Formulario de búsqueda de vuelos optimizado para dispositivos móviles_

---

## 💻 Instalación

### 🚀 Instalación del Servidor

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   - Copiar el archivo `.env.example` y renombrarlo como `.env`
   - Completar los datos necesarios (base de datos, JWT secret, Amadeus API keys, etc.)

3. **Inicializar la base de datos:**
   ```bash
   npm run initdb
   ```
   Este comando creará todas las tablas necesarias en la base de datos.

4. **Iniciar el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

### 🚀 Instalación del Cliente

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   - Copiar el archivo `.env.example` y renombrarlo como `.env`
   - Completar los datos necesarios (URL del servidor, etc.)

3. **Iniciar el cliente en modo desarrollo:**
   ```bash
   npm run dev
   ```

---

## 🛢 Modelo de Base de Datos

El sistema utiliza una base de datos MySQL con las siguientes tablas principales:

### 👋 Tabla: `users`

Gestión de cuentas, roles y autenticación segura.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `userId` | INT UNSIGNED | Identificador único del usuario |
| `username` | VARCHAR(30) | Nombre de usuario |
| `firstName` | VARCHAR(50) | Nombre real del usuario |
| `lastName` | VARCHAR(100) | Apellidos del usuario |
| `email` | VARCHAR(100) | Correo electrónico del usuario |
| `password` | VARCHAR(100) | Contraseña del usuario (hash) |
| `regCode` | CHAR(30) | Código de registro |
| `recoverPassCode` | CHAR(30) | Código de recuperación de contraseña |
| `birthdate` | DATE | Fecha de nacimiento |
| `avatar` | VARCHAR(100) | URL del avatar del usuario |
| `role` | ENUM | Rol del usuario ('admin', 'normal') |
| `active` | BOOLEAN | Indica si el usuario está activo |
| `createdAt` | DATETIME | Fecha de creación |
| `modifiedAt` | DATETIME | Fecha de última modificación |

### ⭐ Tabla: `favorites`

Permite a los usuarios guardar criterios de búsqueda de vuelos.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `favoriteId` | INT UNSIGNED | Identificador único del criterio favorito |
| `userId` | INT UNSIGNED | Identificador del usuario |
| `title` | VARCHAR(100) | Título personalizado por el usuario |
| `origin` | VARCHAR(3) | Código IATA del origen |
| `destination` | VARCHAR(3) | Código IATA del destino |
| `departureDate` | DATE | Fecha de salida |
| `returnDate` | DATE | Fecha de regreso |
| `adults` | TINYINT(5) | Número de adultos en la búsqueda |
| `createdAt` | DATETIME | Fecha de creación del registro |

### 💙 Tabla: `ratings`

Sistema de feedback con puntuaciones y comentarios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `valorationId` | INT UNSIGNED | Identificador único de la valoración |
| `userId` | INT UNSIGNED | Identificador del usuario que valoró |
| `title` | VARCHAR(100) | Título de la valoración |
| `rate` | ENUM | Puntuación ('1', '2', '3', '4', '5') |
| `comment` | VARCHAR(600) | Comentario sobre la experiencia |
| `createdAt` | DATETIME | Fecha de creación |

---

## 📡 API - Endpoints principales

### 🔹 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Registro de nuevos usuarios |
| `POST` | `/api/users/login` | Inicio de sesión con JWT |
| `GET` | `/api/users/profile` | Obtiene la información del usuario autenticado |

### 🔹 Vuelos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/flights/search` | Búsqueda de vuelos con filtros avanzados |
| `GET` | `/api/flights/details/:id` | Detalles de un vuelo específico |

### 🔹 Favoritos y Reservas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/users/favorites` | Guardar un criterio de búsqueda |
| `GET` | `/api/users/favorites` | Listar favoritos guardados |
| `POST` | `/api/users/reservations` | Registrar una reserva de vuelo |
| `GET` | `/api/users/reservations` | Obtener todas las reservas de un usuario |

---

## 🚀 Estado del proyecto

### ✅ Completado
- **MVP (Minimum Viable Product)** - Versión funcional completa

### 🔮 Próximas mejoras
- Integración de vínculos directos a las aerolíneas
- Optimización de rendimiento y carga de datos
- Integración con nuevas APIs de vuelos
- Mejoras en la experiencia de usuario (UX)
- Sistema de notificaciones
- Historial de búsquedas

---

## 👥 Contribución

Este proyecto fue desarrollado siguiendo metodologías ágiles (Scrum/Scrumban) con un enfoque en trabajo en equipo y desarrollo iterativo.

---

## 📄 Licencia

Este proyecto es parte de HackaFlight y está destinado para uso educativo y de desarrollo.

---

**Desarrollado con ❤️ por el equipo de HackaFlight**
