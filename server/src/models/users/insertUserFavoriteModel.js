// Importamos la función que me permite conectarme a la base de datos.
import getPool from '../../db/getPool.js';

// Función que se conecta a la base de datos para insertar un criterio de busqueda favorito
const insertUserFavoriteModel = async (title, favoriteSearch, userId) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Generamos la fecha actual.
    const now = new Date();

    // Insertamos el favorito en la tabla correspondiente.
    const [newFavorite] = await pool.query(
        `
            INSERT INTO favorites (title, favoriteSearch, userId, createdAt)
            VALUES (?, ?, ?, ?)
        `,
        [title, JSON.stringify(favoriteSearch), userId, now],
    );

    return newFavorite.insertId;
};

export default insertUserFavoriteModel;
