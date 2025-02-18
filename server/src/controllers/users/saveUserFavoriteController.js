import saveUserFavoriteModel from '../../models/users/saveUserFavoriteModel.js';
const saveUserFavoriteController = async (req, res, next) => {
    try {
        //Obtenemos los datos de la busqueda que se guardara.
        const { userId } = req.user;
        const {
            title,
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
        } = req.body;

        //Obtenemos la id de la busqueda favorita que fue guardada con su respectivo modelo de insercion.
        const favoriteId = await saveUserFavoriteModel(
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
            message: 'Busqueda favorita guardada con exito',
            data: {
                favoriteId,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default saveUserFavoriteController;
