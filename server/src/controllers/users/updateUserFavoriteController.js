import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateUserFavoriteModel from '../../models/users/updateUserFavoriteModel.js';
const updateUserFavoriteController = async (req, res, next) => {
    try {
        //Obtenemos los datos de la busqueda que se guardaran.
        const { userId } = req.user;
        const { favoriteId } = req.params;
        const {
            title,
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
        } = req.body;

        if (!userId) {
            throw generateErrorUtil(
                'No tienes permiso para actualizar este favorito',
                403,
            );
        }

        if (!favoriteId) {
            throw generateErrorUtil(
                'No se ha indicado el favorito que se quiere actualizar',
                400,
            );
        }

        if (
            !title &&
            !origin &&
            !destination &&
            !departureDate &&
            !returnDate &&
            !adults
        ) {
            throw generateErrorUtil(
                'No se proporcionaron datos para actualizar',
                400,
            );
        }

        //Obtenemos la id de la busqueda favorita actualizada.
        await updateUserFavoriteModel(
            favoriteId,
            title,
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
            userId,
        );
        res.send({
            status: 'Ok',
            message: 'Busqueda favorita actualizada con exito',
            data: {
                favoriteId,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserFavoriteController;
