import deleteUserModel from '../../models/admin/deleteUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteUserController = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Revisamos que el usuario haciendo la peticion es administrador
        if (req.user.role !== 'admin') {
            generateErrorUtil('Faltan permisos de administrador', 403);
        }

        //Llamamos la funcion para borrar el usuario.
        await deleteUserModel(id);

        res.send({
            status: 'ok',
            message: 'Usuario borrado con exito.',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteUserController;
