// Importamos dependencias
import express from 'express';

// Importamos middleware de autenticación y autorización
import authAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import authUserMiddleware from '../middlewares/authUserMiddleware.js';

// Importamos funciones controladoras
import {
    usersListController,
    deleteUserController,
    updateUserStatusController,
} from '../controllers/admin/index.js';

// Creamos un router
const router = express.Router();

// Obtener lista de usuarios (requiere rol de administrador)
router.get(
    '/users/list',
    authUserMiddleware,
    authAdminMiddleware,
    usersListController,
);

// Eliminar un usuario (requiere rol de administrador)
router.delete(
    '/users/:id',
    authUserMiddleware,
    authAdminMiddleware,
    deleteUserController,
);

<<<<<<< HEAD
// Suspende temporalmente al usuario
router.patch(
    '/users/:id/active',
=======
// habilitar / deshabilitar temporalmente al usuario
router.post(
    '/users/active',
>>>>>>> 7728498c72ecdaaa3896b0abd35c6b28ebf5fe47
    authUserMiddleware,
    authAdminMiddleware,
    updateUserStatusController,
);

export default router;
