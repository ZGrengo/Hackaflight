//importamos la conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//función que conecta con la base de datos y obtiene los datos de las valoraciones
const selectRatingsModel = async (rating = '') => {
    //obtenemos el pool de conexiones
    const pool = await getPool();

    //obtenemos los datos de las valoraciones
    const [ratings] = await pool.query(
        `
        SELECT
                v.ratingId AS id,
                v.title,
                v.rate,
                v.comment,
                v.createdAt,
                u.username
            FROM ratings v
            INNER JOIN users u ON u.userId = v.userId
            WHERE v.rate LIKE ?
            ORDER BY v.createdAt DESC;`,
        [`%${rating}%`],
    );

    //devolvemos las valoraciones
    return ratings;
};

//exportamos la función
export default selectRatingsModel;
