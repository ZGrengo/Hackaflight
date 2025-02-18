import { getPool } from '../../db/getPool.js';

const updateUserAvatarModel = async (avatarName, userId) => {
    const pool = await getPool();
    await pool.query(`UPDATE users SET avatar = ? WHERE userId = ?`, [
        avatarName,
        userId,
    ]);
};

export default updateUserAvatarModel;
