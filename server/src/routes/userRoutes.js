//importamos dependencias
import express from 'express';

//importamos middleware--> el de autenticación.

//importamos funciones controladoras

//creamos un router
const router = express.Router();

// Registrar un nuevo usuario

// Validación usuario

// Iniciar sesión de usuario (requiere autenticación)

// Recuperar contraseña (extra)

// Cambiar contraseña (requiere autenticación)

// Obtener el perfil del usuario (requiere estar autenticado)

// Actualizar el perfil del usuario (requiere estar autenticado)(extra)

// Guardar un criterio de búsqueda como favorito (requiere autenticación)

// Obtener la lista de criterios de búsqueda favoritos del usuario (requiere autenticación)

// Obtener detalles de un criterio de búsqueda favorito (requiere autenticación)

// Eliminar un criterio de búsqueda favorito (requiere autenticación)

// Valorar la plataforma (requiere autenticación)

// Obtener lista de valoraciones

//Endpoints adminitrador
// Obtener lista de usuarios (requiere rol de administrador)

// Habilitar / deshabilitar un usuario (requiere rol de administrador)

// Eliminar un usuario (requiere rol de administrador)

//Super-extra
// Obtener las reservas del usuario (requiere autenticación)

export default router;
