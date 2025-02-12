import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generateErrorUtil from '../utils/generateErrorUtil.js';
import selectUserByEmailModel from '../models/users/selectUserByEmailModel.js';

const loginUserController = async ( req, res, next ) => {
    try
    {
        const { email, password } = req.body;

        if ( !email || !password )
        {
            throw generateErrorUtil( 'Faltan campos.', 400 );
        }

        const user = await selectUserByEmailModel( email );

        if ( !user || !( await bcrypt.compare( password, user.password ) ) )
        {
            throw generateErrorUtil( 'Credenciales invalidas.', 403 );
        }

        if ( !user.active )
        {
            throw generateErrorUtil( 'Cuenta en espera de validacion.', 403 );
        }

        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        const token = jwt.sign( tokenInfo, process.env.SECRET, {
            expiresIn: '1d',
        } );

        res.send( {
            status: 'ok',
            data: {
                token,
            },
        } );
    } catch ( err )
    {
        next( err );
    }
};

export default loginUserController;
