import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateActiveUserModel = async (userId) => {
    const pool = await getPool();

    //Revisa si el usuario existe
    const [user] = await pool.query(`SELECT * FROM users WHERE userId = ?`, [
        userId,
    ]);

    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado.', 404);
    }

    //Actualizamos el estado del usuario en la base de datos

    const updateActiveState = user.active ? 0 : 1;

    await pool.query(`UPDATE users SET active = ? WHERE userId = ?`, [
        updateActiveState,
        userId,
    ]);
};

export default updateActiveUserModel;
