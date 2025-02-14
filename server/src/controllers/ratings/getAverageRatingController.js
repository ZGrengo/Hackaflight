//Importamos el modelo necesario
import getAverageRatingModel from '../../models/ratings/getAverageRatingModel.js';

//Función controladora que devuelve la media de valoraciones
const getAverageRatingController = async (req, res, next) => {
    try {
        //Obtenemos la media de valoraciones
        const averageData = await getAverageRatingModel();
        console.log('media:', averageData);

        //enviamos la respuesta
        res.send({
            status: 'ok',
            data: averageData,
        });
    } catch (err) {
        next(err);
    }
};
//Exportamos la función
export default getAverageRatingController;
