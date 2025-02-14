//importamos dependencias
import express from 'express';

//importamos controladores de valoraciones
import {
    getAverageRatingController,
    listRatingsController,
} from '../controllers/ratings/indexRatingControllers.js';

//creamos un router
const router = express.Router();

//Endpoint para obtener la media de valoraciones.
router.get('/avg', getAverageRatingController);

//Endpoint para listar todas las valoraciones
router.get('', listRatingsController);

export default router;
