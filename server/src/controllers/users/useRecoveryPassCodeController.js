import recoverUserPassModel from '../../models/users/recoverUserPassModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const recoveryPassCodeController = async (req, res, next) => {
    try {
        const { recoverPassCode } = req.params;

        const { newPassword, repeatedNewPass } = req.body;

        if (!newPassword || !repeatedNewPass) {
            generateErrorUtil('Faltan campos.', 400);
        }

        if (newPassword !== repeatedNewPass) {
            generateErrorUtil('Las contraseñas no coinciden', 400);
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
