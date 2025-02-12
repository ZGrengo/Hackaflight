import selectUserByEmailModel from '../models/users/selectUserByEmailModel.js';

const privateUserProfileController = async ( req, res, next ) => {
    try
    {
        const user = await selectUserByEmailModel( req.user.userId );

        if ( !user )
        {
            new Error( 'Usuario no encontrado.' );
        }

        res.send( {
            status: 'Ok',
            data: {
                user,
            },
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default privateUserProfileController;
