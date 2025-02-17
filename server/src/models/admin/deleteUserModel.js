import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteUserModel = async (userId) => {
    const pool = await getPool();

    //Revisa si el usuario existe
    const [user] = await pool.query(`SELECT * FROM users WHERE userId = ?`, [
        userId,
    ]);

    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado.', 404);
    }

    //Borramos el usuario de la base de datos
    await pool.query(`DELETE FROM users WHERE userId = ?`, [userId]);
};

export default deleteUserModel;
