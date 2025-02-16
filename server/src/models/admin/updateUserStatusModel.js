import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserStatusModel = async (userId) => {
    const pool = await getPool();

    //Revisa si el usuario existe
    const [user] = await pool.query(`SELECT * FROM users WHERE userId = ?`, [
        userId,
    ]);
    // Si no existe lanzamos un error
    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado.', 404);
    }

    // Creamos dos variables para actualizarel estado en funcion de su estado actual
    const currentStatus = user[0].active;

    const newStatus = currentStatus === 1 ? 0 : 1;

    //Actualizamos el estado del usuario en la base de datos
    await pool.query(`UPDATE users SET active = ? WHERE userId = ?`, [
        newStatus,
        userId,
    ]);
};

export default updateUserStatusModel;
