// Importamos las dependencias necesarias
import express from 'express';
import searchFlightsController from '../controllers/flights/searchFlightsController.js';
import searchFlightsSchema from '../schemas/searchFlightsSchema.js';
import joiValidatorMiddleware from '../middlewares/joiValidatorMiddleware.js';

// Creamos un router de express
const router = express.Router();

// Endpoint para buscar vuelos y validarlos con la dependencia joi
<<<<<<< HEAD
router.get(
    '/search',
    joiValidatorMiddleware(searchFlightsSchema),
    searchFlightsController,
);
=======

router.get('/search', joiValidatorError, searchFlightsController);
>>>>>>> e3ad0e5e5296409c92b036286a45f8f1ba695061

export default router;
