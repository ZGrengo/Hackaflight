import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT userId, firstName, lastName, username, email, avatar, role, birthdate, createdAt FROM users WHERE userId = ?
        `,
        [userId],
    );

    if (user.length < 1) {
        throw generateErrorUtil('Usuario no encontrado.', 404);
    }
    return user[0];
};

export default selectUserByIdModel;
