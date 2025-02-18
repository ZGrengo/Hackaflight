import express from 'express';
import joiValidatorError from '../middlewares/joiValidatorMiddleware.js';
import searchFlightsController from '../controllers/flights/searchFlightsController.js';

const router = express.Router();

// Endpoint para buscar vuelos y validarlos con la dependencia joi

router.get('/search', joiValidatorError, searchFlightsController);

export default router;
