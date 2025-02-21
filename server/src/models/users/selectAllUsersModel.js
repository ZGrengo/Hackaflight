// Importamos la función que retorna una conexión con la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos y retorna todos los usuarios o filtra por los criterios dados.
// Recibimos un objeto vacío por defecto.

const selectAllUsersModel = async ({
    userId,
    username,
    firstName,
    lastName,
    email,
} = {}) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Construimos la consulta SQL con los filtros proporcionados.( Where 1=1 ) para agregar filtros opcionales.
    let query =
        'SELECT userId, firstName, lastName, username, email, birthdate, createdAt FROM users WHERE 1=1';

    const params = [];

    if (userId) {
        query += ' AND userId = ?';
        params.push(userId);
    }

    if (username) {
        query += ' AND username LIKE ?';
        params.push(`%${username}%`);
    }

    if (firstName) {
        query += ' AND firstName LIKE ?';
        params.push(`%${firstName}%`);
    }

    if (lastName) {
        query += ' AND lastName LIKE ?';
        params.push(`%${lastName}%`);
    }

    if (email) {
        query += ' AND email LIKE ?';
        params.push(`%${email}%`);
    }

    // Ejecutamos la consulta.
    const [users] = await pool.query(query, params);

    // Si no se encuentran usuarios, lanzamos un error.
    if (users.length < 1) {
        throw generateErrorUtil('Usuario no encontrado.', 404);
    }

    // Retornamos los usuarios.
    return users;
};

export default selectAllUsersModel;
