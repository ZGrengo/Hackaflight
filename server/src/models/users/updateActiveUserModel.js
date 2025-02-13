import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateActiveUserModel = async (regCode) => {
    console.log('RECIEVED CODE IN THE MODEL', regCode);
    const pool = await getPool();
    const [users] = await pool.query(
        `SELECT userId FROM users WHERE regCode = ?`,
        [regCode],
    );

    if (users.length < 1) {
        generateErrorUtil('Invalid register code', 404);
    }

    await pool.query(
        `UPDATE users SET active = TRUE, regCode = null WHERE regCode = ?`,
        [regCode],
    );
};

export default updateActiveUserModel;
