//Importamos modelos necesarios
import insertRatingModel from '../../models/ratings/insertRatingModel.js';

//importamos función que lanza un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Creamos la función que permite añadir una valoración
const createRatingController = async (req, res, next) => {
    try {
        //obtenemos los datos necesarios del body
        const { title, rate, comment } = req.body;

        //si falta algún campo, lanzamos un error.
        if (!title || !rate || !comment) {
            generateErrorUtil('Faltan campos', 400);
        }
        //insertamos la valoración y obtenemos el id que mysql ha generado
        const ratingId = await insertRatingModel(
            title,
            rate,
            comment,
            req.user.userId,
        );

        //enviamos una respuesta
        res.send({
            status: 'ok',
            message: 'Valoración creada con éxito',
            data: {
                ratingId,
            },
        });
    } catch (err) {
        next(err);
    }
};

//exportamos la función
export default createRatingController;
