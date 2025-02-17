import { getPool } from '../../db/getPool.js';

const insertRecoverPassCodeModel = async (recoverPassCode, email) => {
    const pool = await getPool();
    await pool.query(`UPDATE users SET recoverPassCode = ? WHERE email = ?`, [
        recoverPassCode,
        email,
    ]);
};

export default insertRecoverPassCodeModel;
