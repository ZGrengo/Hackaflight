import generateErrorUtil from '../utils/generateErrorUtil.js';

const authAdminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(
            generateErrorUtil(
                'Acceso denegado. Solo los administradores pueden acceder a esta información.',
                403,
            ),
        );
    }
    next();
};

export default authAdminMiddleware;
