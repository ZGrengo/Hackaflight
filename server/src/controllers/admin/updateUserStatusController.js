import updateUserStatusModel from '../../models/admin/updateUserStatusModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserStatusController = async (req, res, next) => {
    try {
        const { userId } = req.body;

        //Revisamos que el usuario haciendo la peticion es administrador
        if (req.user.role !== 'admin') {
            generateErrorUtil('Faltan permisos de administrador', 403);
        }

        //Llamamos la funcion para actualizar el estado del usuario
        await updateUserStatusModel(userId);

        res.send({
            status: 'ok',
            message: 'Estado del usuario actualizado con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserStatusController;
