// Importamos las dependencias necesarias
import express from 'express';
import searchFlightsController from '../controllers/flights/searchFlightsController.js';
import { storeFlightListController, filterFlightListController } from '../controllers/flights/flightListController.js';
import searchFlightsSchema from '../schemas/searchFlightsSchema.js';
import joiValidatorMiddleware from '../middlewares/joiValidatorMiddleware.js';

// Creamos un router de express
const router = express.Router();

// Endpoint para buscar vuelos y validarlos con la dependencia joi

router.get(
    '/search',
    joiValidatorMiddleware(searchFlightsSchema),
    searchFlightsController,
);
//router.get('/search', joiValidatorError, searchFlightsController);

// Endpoint para listar vuelos
router.get('/store', joiValidatorMiddleware,storeFlightListController);

// Endpoint para filtrar vuelos
router.get('/filter', joiValidatorMiddleware, filterFlightListController);



export default router;
