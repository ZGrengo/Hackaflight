//importamos dependencias
import express from 'express';

//importamos middleware--> el de autenticación.
import authUserMiddleware from '../middlewares/index.js';

//importamos funciones controladoras
import {
    loginUserController,
    privateUserProfileController,
    deleteUserController,
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
router.post('/register', registerUserController);

// Validación usuario
router.put('/validate/:regCode', activateUserController);

// Iniciar sesión de usuario (requiere Validacion)
router.post('/login', loginUserController);

// Recuperar contraseña (extra)
router.post('/register', registerUserController);

// Cambiar contraseña (requiere autenticación)
router.post('/password', authUserMiddleware, updateUserPassController);

// Obtener el perfil del usuario (requiere estar autenticado)
router.get('', authUserMiddleware, privateUserProfileController);

// Actualizar el perfil del usuario (requiere estar autenticado)(extra)

// Guardar un criterio de búsqueda como favorito (requiere autenticación)
router.post('/favorites', authUserMiddleware, saveUserFavoriteController);

// Obtener la lista de criterios de búsqueda favoritos del usuario (requiere autenticación)
router.get('/favorites', authUserMiddleware, userFavoriteController);

// Obtener detalles de un criterio de búsqueda favorito (requiere autenticación)
router.get('/favorites/:title', authUserMiddleware, userFavoriteController);

// Eliminar un criterio de búsqueda favorito (requiere autenticación)
router.delete(
    '/favorites/:favoriteId',
    authUserMiddleware,
    deleteUserFavoriteController,
);

// Valorar la plataforma (requiere autenticación)
router.post('', authUserMiddleware, createRatingController);

//Endpoints administrador
// Obtener lista de usuarios (requiere rol de administrador)

// Habilitar / deshabilitar un usuario (requiere rol de administrador)

// Eliminar un usuario (requiere rol de administrador)
router.delete('/:id', authUserMiddleware, deleteUserController);

export default router;
