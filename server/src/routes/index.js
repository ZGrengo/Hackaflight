// Importamos las dependencias y las rutas de usuarios y administradores.
import express from 'express';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';

// Creamos un router
const router = express.Router();

// Usamos las rutas de usuarios y administradores
router.use( userRoutes );
router.use( adminRoutes );

// Exportamos el router.
export default router;