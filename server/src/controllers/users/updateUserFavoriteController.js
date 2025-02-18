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
