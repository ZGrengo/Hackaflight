//importamos dependencias
import express from 'express';

//importamos middleware--> el de autenticación.
import authUserMiddleware from '../middlewares/index.js';

//importamos funciones controladoras
import {
    loginUserController,
    privateUserProfileController,
    deleteUserController,
} from '../controllers/users/index.js';

import listRatingsController from '../controllers/ratings/listRatingsController.js';

//creamos un router
const router = express.Router();

// Registrar un nuevo usuario

// Validación usuario

// Iniciar sesión de usuario (requiere Validacion)
router.post('/login', loginUserController);

// Recuperar contraseña (extra)

// Cambiar contraseña (requiere autenticación)

// Obtener el perfil del usuario (requiere estar autenticado)
router.get('', authUserMiddleware, privateUserProfileController);

// Actualizar el perfil del usuario (requiere estar autenticado)(extra)

// Guardar un criterio de búsqueda como favorito (requiere autenticación)

// Obtener la lista de criterios de búsqueda favoritos del usuario (requiere autenticación)

// Obtener detalles de un criterio de búsqueda favorito (requiere autenticación)

// Eliminar un criterio de búsqueda favorito (requiere autenticación)

// Valorar la plataforma (requiere autenticación)

// Obtener lista de valoraciones
router.get('', listRatingsController);

//Endpoints adminitrador
// Obtener lista de usuarios (requiere rol de administrador)

// Habilitar / deshabilitar un usuario (requiere rol de administrador)

// Eliminar un usuario (requiere rol de administrador)
router.delete('/:id', authUserMiddleware, deleteUserController);

//Super-extra
// Obtener las reservas del usuario (requiere autenticación)

export default router;
