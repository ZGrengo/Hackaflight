// Importamos dependencias
import express from 'express';

// Importamos middleware de autenticación y autorización
import authUserMiddleware from '../middlewares/authAdminMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

// Importamos funciones controladoras
import {
    usersListController,
    deleteUserController,
} from '../controllers/admin/index.js';

// Creamos un router
const router = express.Router();

// Obtener lista de usuarios (requiere rol de administrador)
router.get( '/admin/users', authUserMiddleware, adminMiddleware, usersListController );

// Eliminar un usuario (requiere rol de administrador)
router.delete( '/admin/users/:id', authUserMiddleware, adminMiddleware, deleteUserController );

export default router;