// Importamos dependencias
import express from 'express';

// Importamos middleware de autenticación y autorización
import authAdminMiddleware from '../middlewares/authAdminMiddleware.js';

// Importamos funciones controladoras
import {
    usersListController,
    deleteUserController,
} from '../controllers/admin/index.js';

// Creamos un router
const router = express.Router();

// Obtener lista de usuarios (requiere rol de administrador)
router.get( '/users/list', authAdminMiddleware, usersListController );

// Eliminar un usuario (requiere rol de administrador)
router.delete( '/users/:Id',authAdminMiddleware, deleteUserController );

export default router;