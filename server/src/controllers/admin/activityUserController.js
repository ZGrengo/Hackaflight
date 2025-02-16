import activateUserModelUserModel from '../../models/admin/activateUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const activityUserController = async ( req, res, next ) => {
    try
    {
        const { id } = req.params;

        //Revisamos que el usuario haciendo la peticion es administrador
        if ( req.user.role !== 'admin' )
        {
            generateErrorUtil( 'Faltan permisos de administrador', 403 );
        }

        //Llamamos la funcion para borrar el usuario.
        await activateUserModelUserModel( id );

        res.send( {
            status: 'ok',
            message: 'Usuario suspendido con exito.',
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default activityUserController;
