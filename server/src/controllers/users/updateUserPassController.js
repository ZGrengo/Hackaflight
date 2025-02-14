import updateUserPassModel from '../../models/users/updateUserPassModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserPassController = async (req, res, next) => {
    try {
        //Obtenemos el id del usuario autenticado.
        const userId = req.user?.userId;

        const { currentPassword, newPassword } = req.body;

        //Verificamos que ambos campos existen.
        if (!currentPassword || !newPassword) {
            generateErrorUtil('Faltan campos obligatorios.', 400);
        }

        //Llamamos al modelo para actualizar la contraseña.
        await updateUserPassModel(userId, currentPassword, newPassword);

        res.status(200).send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente.',
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserPassController;
