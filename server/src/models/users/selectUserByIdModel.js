import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectUserByIdModel = async (userId) => {
    const pool = await getPool();
    const [users] = await pool.query(
        `
        Select id, firstname, lastname, username, email, avatar, role, birthdate, createdAt FROM users where userId = ?
        `,
        [userId],
    );

    if (users.length < 1) {
        generateErrorUtil('Usuario no encontrado.', 404);
    }
    return users[0];
};

export default selectUserByIdModel;
