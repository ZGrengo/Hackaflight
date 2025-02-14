import getPool from "../../db/getPool.js";

import generateErrorUtil from "../../utils/generateErrorUtil.js";

// Inicializamos el modelo.
const updateUserModel = async ({firstName, lastName, username, email, birthdate, userId}) => {
    const pool = await getPool();
    
    if (firstName) {
        await pool.query(
            `UPDATE users SET firstName = ?, modifiedAt = ? WHERE userId = ?`,
            [firstName, new Date(), userId],
        );
    }
    
    if (lastName) {
        await pool.query(
            `UPDATE users SET lastName = ?, modifiedAt = ? WHERE userId = ?`,
            [lastName, new Date(), userId],
        );
    }

    if (username) {
        const [users] = await pool.query(
            `SELECT userId FROM users WHERE username = ?`,
            [username],
        );

        if (users.length > 0 && users[0].userId !== userId) {
            generateErrorUtil('Nombre de usuario no disponible', 409);
        }

        await pool.query(
            `UPDATE users SET username = ?, modifiedAt = ? WHERE userId = ?`,
            [username, new Date(), userId],
        );
    }

    if (email) {
        const [users] = await pool.query(
            `SELECT userId FROM users WHERE email = ?`,
            [email],
        );

        if (users.length > 0 && users[0].userId !== userId) {
            generateErrorUtil('Email no disponible', 409);
        }

        await pool.query(
            `UPDATE users SET email = ?, modifiedAt = ? WHERE userId = ?`,
            [email, new Date(), userId],
        );
    }

    if (birthdate) {
        await pool.query(
            `UPDATE users SET birthdate = ?, modifiedAt = ? WHERE userId = ?`,
            [birthdate, new Date(), userId],
        );
    }

};

export default updateUserModel;