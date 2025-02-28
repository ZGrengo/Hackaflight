//importamos la conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//función que conecta con la base de datos y obtiene la media de las valoraciones.
const getAverageRatingModel = async () => {
    //obtenemos el pool de conexiones
    const pool = await getPool();

    //obtenemos la media de las valoraciones
    const [average] = await pool.query(
        `
        SELECT 
            COUNT(*) as total_ratings,
            ROUND(AVG(CAST(rate AS DECIMAL)), 1) as average_rating
        FROM ratings
        `,
    );
    //Devolvemos la media de las valoraciones
    return average[0];
};

//exportamos la función
export default getAverageRatingModel;
