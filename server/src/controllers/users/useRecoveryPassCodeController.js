import recoverUserPassModel from '../../models/users/recoverUserPassModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const recoveryPassCodeController = async (req, res, next) => {
    try {
        const { recoverPassCode } = req.params;

        const { newPassword } = req.body;

        if (!newPassword) {
            generateErrorUtil('Faltan campos.', 400);
        }

        await recoverUserPassModel(recoverPassCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada.',
        });
    } catch (err) {
        next(err);
    }
};

export default recoveryPassCodeController;
