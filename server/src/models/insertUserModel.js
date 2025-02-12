// Importamos dependencias.
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Importamos la función que me permite conectarme a la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que envía un email.
import sendMailUtil from '../../utils/sendMailUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos para crear un nuevo usuario.
const insertUserModel = async ( username, email, password ) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Obtenemos el listado de usuarios que tengan el nombre de usuario que recibimos
    // por body. Utilizamos destructuring con arrays para quedarme concretamente con
    // el array de resultados de SELECT que será el array que esá en la posición cero.
    let [ users ] = await pool.query( `SELECT id FROM users WHERE username = ?`, [
        username,
    ] );

    // Lanzamos un error si ya existe un usuario con ese nombre.
    if ( users.length > 0 )
    {
        generateErrorUtil( 'Nombre de usuario no disponible', 409 );
    }

    // Obtenemos el listado de usuarios que tengan el email que recibimos por body.
    [ users ] = await pool.query( `SELECT id FROM users WHERE email = ?`, [ email ] );

    // Lanzamos un error si ya existe un usuario con ese email.
    if ( users.length > 0 )
    {
        generateErrorUtil( 'Email no disponible', 409 );
    }

    // Generamos un código de registro de 30 caracteres.
    const regCode = crypto.randomBytes( 15 ).toString( 'hex' );

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash( password, 10 );

    // Generamos la fecha actual.
    const now = new Date();

    // Insertamos el usuario en la tabla correspondiente.
    await pool.query(
        `
            INSERT INTO users (username, email, password, regCode, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `,
        [ username, email, hashedPass, regCode, now ],
    );

    // Asunto del email de verificación.
    const emailSubject = 'Activa tu usuario en Diario de Viajes :)';

    // Cuerpo del email de verificación.
    const emailBody = `
        ¡Bienvenid@ ${ username }!

        Gracias por registrarte en Diario de Viajes. Para activar tu cuenta, haz click en el siguiente enlace:

        <a href="${ process.env.CLIENT_URL }/users/validate/${ regCode }">¡Activa tu usuario!</a>
    `;

    // Enviamos el email.
    await sendMailUtil( email, emailSubject, emailBody );
};

export default insertUserModel;
