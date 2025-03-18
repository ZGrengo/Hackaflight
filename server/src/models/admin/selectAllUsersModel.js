// Importamos la función que retorna una conexión con la base de datos.
import { getPool } from '../../db/getPool.js';

import dotenv from 'dotenv';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos y retorna todos los usuarios o filtra por los criterios dados.
// Recibimos un objeto vacío por defecto.
dotenv.config();

const selectAllUsersModel = async (
    userId,
    username,
    firstName,
    lastName,
    email,
) => {
    const pool = await getPool();
    let query = `
    SELECT 
        userId, 
        firstName, 
        lastName, 
        username, 
        email, 
        birthdate,
        active, 
        createdAt 
    FROM users`;

    const params = [];
    const conditions = [];

    if (userId) {
        conditions.push('userId = ?');
        params.push(userId);
    }

    if (username) {
        conditions.push('username LIKE ?');
        params.push(`%${username}%`);
    }

    if (firstName) {
        conditions.push('firstName LIKE ?');
        params.push(`%${firstName}%`);
    }

    if (lastName) {
        conditions.push('lastName LIKE ?');
        params.push(`%${lastName}%`);
    }

    if (email) {
        conditions.push('email LIKE ?');
        params.push(`%${email}%`);
    }

    // Excluir al administrador si está definido en el .env
    if (process.env.MYSQL_ADMIN_EMAIL) {
        conditions.push('email != ?');
        params.push(process.env.MYSQL_ADMIN_EMAIL);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY createdAt DESC`;

    const [users] = await pool.query(query, params);

    if (users.length < 1) {
        throw generateErrorUtil('No se encontraron usuarios.', 404);
    }

    return users;
};

export default selectAllUsersModel;
