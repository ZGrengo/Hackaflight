import updateUserStatusModel from '../../models/admin/updateUserStatusModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserStatusController = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const { id } = req.params; // ID del usuario
=======
        const { userId } = req.body;
>>>>>>> 7728498c72ecdaaa3896b0abd35c6b28ebf5fe47

        //Revisamos que el usuario haciendo la peticion es administrador
        if (req.user.role !== 'admin') {
            generateErrorUtil('Faltan permisos de administrador', 403);
        }

<<<<<<< HEAD
        // Llamamos la función para actualizar el estado del usuario
        const { newStatus } = await updateUserStatusModel(id);

        res.send({
            status: 'ok',
            message: 'Estado del usuario actualizado con exito.',
            active: newStatus, // Devolvemos el nuevo estado
=======
        //Llamamos la funcion para actualizar el estado del usuario
        await updateUserStatusModel(userId);

        res.send({
            status: 'ok',
            message: 'Estado del usuario actualizado con éxito.',
>>>>>>> 7728498c72ecdaaa3896b0abd35c6b28ebf5fe47
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserStatusController;
