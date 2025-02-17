import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

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
