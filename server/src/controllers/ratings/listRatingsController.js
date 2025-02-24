//importamos modelo
import selectRatingsModel from '../../models/ratings/selectRatingsModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que obtiene el listado de las valoraciones
const listRatingsController = async (req, res, next) => {
    try {
        //obtenemos los params
        const { rating } = req.query;

        //obtenemos las valoraciones
        const ratings = await selectRatingsModel(rating);
        //console.log('Ratings from DB:', ratings);

        //comprobamos si hay valoraciones con el mismo valor que rating filtrado
        if (rating && ratings.length === 0) {
            //si no hay valoraciones con el mismo valor que el rating, lanzamos un error
            generateErrorUtil(
                `No se encontraron valoraciones con puntuación ${rating}`,
                404,
            );
        }
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
