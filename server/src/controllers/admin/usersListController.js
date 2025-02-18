import selectAllUsersModel from '../../models/admin/selectAllUsersModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const usersListController = async (req, res, next) => {
    try {
        // Verificamos si el solicitante es un administrador
        if (req.user.role !== 'admin') {
            generateErrorUtil(
                'Acceso denegado. Solo los administradores pueden acceder a esta información.',
                403,
            );
        }
        const users = await selectAllUsersModel(req.query);
        res.send({
            status: 'ok',
            data: users,
        });
    } catch (err) {
        next(err);
    }
};

export default usersListController;
