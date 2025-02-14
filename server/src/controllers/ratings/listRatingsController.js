//importamos modelo
import selectRatingsModel from '../../models/ratings/selectRatingsModel.js';

//Función controladora que obtiene el listado de las valoraciones
const listRatingsController = async (req, res, next) => {
    try {
        //obtenemos los params
        const { rating } = req.query;

        //obtenemos las valoraciones
        const ratings = await selectRatingsModel(rating);
        //console.log('Ratings from DB:', ratings);
        //enviamos una respuesta
        res.send({
            status: 'ok',
            data: { total: ratings.length, ratings },
        });
    } catch (err) {
        next(err);
    }
};

//exportamos la función
export default listRatingsController;
