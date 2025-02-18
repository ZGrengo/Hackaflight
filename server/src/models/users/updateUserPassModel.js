import generateErrorUtil from '../../utils/generateErrorUtil.js';
import { getPool } from '../../db/getPool.js';
import bcrypt from 'bcrypt';

// Funcion que actualiza la contraseña de un usuario autenticado.
const updateUserPassModel = async (userId, currentPassword, newPassword) => {
    const pool = await getPool();

    //Obtenemos la actual contraseña del usuario
    const [users] = await pool.query(
        `SELECT password FROM users WHERE userId = ?`,
        [userId],
    );

    if (users.length < 1) {
        throw generateErrorUtil('Usuario no encontrado', 404);
    }

    const storedPassword = users[0].password;

    //Comparamos la contraseña actual con la almacenada.
    const passMatch = await bcrypt.compare(currentPassword, storedPassword);

    if (!passMatch) {
        throw generateErrorUtil('La contraseña actual es incorrecta', 401);
    }

    //Encriptamos la nueva contraseña.
    const hashedPass = await bcrypt.hash(newPassword, 10);

    const now = new Date();

    // Actualizamos la contraseña del usuario.
    await pool.query(
        `UPDATE users SET password = ?, modifiedAt = ? WHERE userId = ?`,
        [hashedPass, now, userId],
    );
};

export default updateUserPassModel;
