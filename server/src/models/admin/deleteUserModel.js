import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteUserModel = async (userId) => {
    const pool = await getPool();

    //Revisa si el usuario existe
    const [user] = await pool.query(
        `SELECT userId FROM users WHERE userId = ?`,
        [userId],
    );

    if (user.length === 0) {
        throw generateErrorUtil('Usuario no encontrado.', 404);
    }
    // Primero eliminamos los registros relacionados
    await pool.query(`DELETE FROM favorites WHERE userId = ?`, [userId]);
    await pool.query(`DELETE FROM ratings WHERE userId = ?`, [userId]);

    //Borramos el usuario de la base de datos
    await pool.query(`DELETE FROM users WHERE userId = ?`, [userId]);
};

export default deleteUserModel;
