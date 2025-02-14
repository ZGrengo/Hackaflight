//importamos modelo
import selectRatingsModel from '../../models/ratings/selectRatingsModel.js';

//Función controladora que obtiene el listado de las valoraciones
const listRatingsController = async (req, res, next) => {
    try {
        //obtenemos los params
        const { rating } = req.query;

        // rating = rating ? Number(rating) : null; // Convertimos solo si existe un valor

        //obtenemos las valoraciones
        const ratings = await selectRatingsModel(rating);

        //enviamos una respuesta
        res.send({
            status: 'ok',
            data: {
                ratings,
            },
        });
    } catch (err) {
        next(err);
    }
};

//exportamos la función
export default listRatingsController;
