//importamos la conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//Función que conecta con la base de datos e inserta una valoración
const insertRatingModel = async (title, rate, comment, userId) => {
    //obtenemos el pool de conexiones
    const pool = await getPool();
    //insertamos la valoración
    const [newRating] = await pool.query(
        `INSERT INTO ratings (userId, title, rate, comment) 
        VALUES (?, ?, ?, ?)`,
        [userId, title, rate, comment],
    );
    //Devolvemos el Id que mysql le ha asigando a la valoración
    return newRating.insertId;
};
//exportamos la función
export default insertRatingModel;
