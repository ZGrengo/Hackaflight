//importamos el modelo
import selectUserFavoriteModel from '../../models/users/selectUserFavoriteModel.js';

const userFavoriteController = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { favoriteId } = req.params;

        const favorites = await selectUserFavoriteModel(favoriteId, userId);
        res.send({
            status: 'Ok',
            data: {
                favorites,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default userFavoriteController;
