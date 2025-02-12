import express from 'express';
import searchFlightsController from '../controllers/flights/searchFlightsController.js';

const router = express.Router();
// Endpoint para buscar vuelos
router.get('/flights/search', searchFlightsController);

export default router;
