import selectAllUsersModel from '../../models/users/selectAllUsersModel.js'; // Corrección del nombre del archivo importado
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const usersListController = async ( req, res, next ) => {
    try
    {
        // Verificamos si el solicitante es un administrador
        if ( req.user.role !== 'admin' )
        {
            generateErrorUtil( 'Acceso denegado. Solo los administradores pueden acceder a esta información.', 403 );
        }

        const users = await selectAllUsersModel( {} );

        res.send( {
            status: 'ok',
            data: users,
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default usersListController;