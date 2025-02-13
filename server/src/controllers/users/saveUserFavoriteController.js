import selectUserFavoriteModel from '../../models/users/selectUserFavoriteModel.js';
const saveUserFavoriteController = async (req, res, next) => {
    try {
        //TODO
        const { userId } = req.user.userId;

        const favorites = await selectUserFavoriteModel(null, userId);
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

export default saveUserFavoriteController;
