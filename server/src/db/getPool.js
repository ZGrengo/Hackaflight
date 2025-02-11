// Importamos las dependencias.
import mysql from 'mysql2/promise';

// Obtenemos las variables de entorno necesarias.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un grupo de conexiones con la base de datos.
let pool;

// Función que retorna las conexiones.
const getPool = async () => {
    try {
        // Si no existen conexiones las creamos.
        if (!pool) {
            // Creamos una única conexión con el servidor MySQL.
            const dbConnection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            // Con dicha conexión vamos a crear la base de datos si no existe.
            await dbConnection.query(
                `CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`,
            );

            // Tras asegurarnos de que existe la base de datos creamos el pool.
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        // Retornamos el pool.
        return await pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
