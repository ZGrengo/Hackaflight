import express from 'express';
import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import searchFlightsController from '../controllers/flights/searchFlightsController.js';

const router = express.Router();
// Endpoint para buscar vuelos
router.get('/api/flights/search', authUserMiddleware, searchFlightsController);

export default router;
