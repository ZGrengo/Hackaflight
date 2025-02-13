import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';

const privateUserProfileController = async (req, res, next) => {
    try {
        const user = await selectUserByIdModel(req.user.userId);

        res.send({
            status: 'Ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default privateUserProfileController;
