import deleteUserFavoriteModel from '../../models/users/deleteUserFavoriteModel.js';

const deleteUserFavoriteController = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { favoriteId } = req.params;

        //Llamamos la funcion para borrar el criterio de busqueda.
        const deletedFavoriteId = await deleteUserFavoriteModel(
            favoriteId,
            userId,
        );

        res.send({
            status: 'ok',
            message: 'Criterio de busqueda borrado con exito.',
            data: {
                favoriteId: deletedFavoriteId, // Enviamos el favoriteId eliminado
            },
        });
    } catch (err) {
        next(err);
    }
};

export default deleteUserFavoriteController;
