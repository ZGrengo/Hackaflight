import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserStatusModel = async ({ userId }) => {
    const pool = await getPool();
    //Revisa si el usuario existe
    const [user] = await pool.query(`SELECT * FROM users WHERE userId = ?`, [
        userId,
    ]);
    // Si no existe lanzamos un error
    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado.', 404);
    }

    // Accedemos al primer usuario, ya que la consulta devuelve un array
    const userData = user[0];
    // Asegurémonos de que userData existe
    if (!userData) {
        console.log('Usuario no encontrado al intentar acceder a user[0].');
        throw generateErrorUtil(
            `Usuario no encontrado en la base de datos.${userId}`,
            404,
        );
    }
    // Creamos dos variables para actualizar el estado en funcion de su estado actual
    const currentStatus = userData.active;

    const newStatus = currentStatus === 1 ? 0 : 1;

    //Actualizamos el estado del usuario en la base de datos

    await pool.query(`UPDATE users SET active = ? WHERE userId = ?`, [
        newStatus,
        userId,
    ]);
    return { newStatus };
};

export default updateUserStatusModel;
