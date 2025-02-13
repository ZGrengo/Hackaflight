import deleteUserModel from '../../models/users/deleteUserModel.js';

const deleteUserFavoriteController = async (req, res, next) => {
    try {

        const { userId } = req.user.userId;
        const { favoriteId } = req.params;

        //Llamamos la funcion para borrar el criterio de busqueda.
        await deleteUserModel(userId, favoriteId);

        res.send({
            status: 'ok',
            message: 'Criterio de busqueda borrado con exito.',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteUserFavoriteController;
