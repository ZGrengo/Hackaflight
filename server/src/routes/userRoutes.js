//importamos dependencias
import express from 'express';

//importamos middleware--> el de autenticación.
import authUserMiddleware from '../middlewares/index.js';

//importamos funciones controladoras
import {
    loginUserController,
    privateUserProfileController,
    userFavoriteController,
    deleteUserFavoriteController,
    updateUserPassController,
    registerUserController,
    saveUserFavoriteController,
    activateUserController,
} from '../controllers/users/index.js';

//importamos controladores de valoraciones
import { createRatingController } from '../controllers/ratings/indexRatingControllers.js';

//creamos un router
const router = express.Router();

// Registrar un nuevo usuario
router.post( '/users/register', registerUserController );

// Validación usuario
router.put( '/users/validate/:regCode', activateUserController );

// Iniciar sesión de usuario (requiere Validacion)
router.post( '/users/login', loginUserController );

// Recuperar contraseña (extra)
router.post( '/users/register', registerUserController );

// Cambiar contraseña (requiere autenticación)
router.post( '/users/password', authUserMiddleware, updateUserPassController );

// Obtener el perfil del usuario (requiere estar autenticado)
router.get( '/users/profile', authUserMiddleware, privateUserProfileController );

// Actualizar el perfil del usuario (requiere estar autenticado)(extra)

// Guardar un criterio de búsqueda como favorito (requiere autenticación)
router.post( '/users/favorites', authUserMiddleware, saveUserFavoriteController );

// Obtener la lista de criterios de búsqueda favoritos del usuario (requiere autenticación)
router.get( '/users/favorites', authUserMiddleware, userFavoriteController );

// Obtener detalles de un criterio de búsqueda favorito (requiere autenticación)
router.get( '/users/favorites/:title', authUserMiddleware, userFavoriteController );

// Eliminar un criterio de búsqueda favorito (requiere autenticación)
router.delete(
    '/users/favorites/:favoriteId',
    authUserMiddleware,
    deleteUserFavoriteController,
);

// Valorar la plataforma (requiere autenticación)
router.post( '/users/ratings', authUserMiddleware, createRatingController );

export default router;
