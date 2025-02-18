import updateUserStatusModel from '../../models/admin/updateUserStatusModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserStatusController = async (req, res, next) => {
    try {
        const { id } = req.params; // ID del usuario

        //Revisamos que el usuario haciendo la peticion es administrador
        if (req.user.role !== 'admin') {
            generateErrorUtil('Faltan permisos de administrador', 403);
        }

        // Llamamos la función para actualizar el estado del usuario
        const { newStatus } = await updateUserStatusModel({ userId: id });

        res.send({
            status: 'ok',
            message: 'Estado del usuario actualizado con exito.',
            active: newStatus, // Devolvemos el nuevo estado
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserStatusController;
