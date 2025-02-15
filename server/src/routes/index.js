// Importamos las dependencias y las rutas de usuarios y administradores.
import express from 'express';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import flightRoutes from './flightRoutes.js';
import ratingRoutes from './ratingRoutes.js';

// Creamos un router
const router = express.Router();

// Usamos las rutas
router.use('/users', userRoutes );
router.use('/admin', adminRoutes );
router.use('/flights', flightRoutes );
router.use('/ratings', ratingRoutes );

// Exportamos el router.
export default router;