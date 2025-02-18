// Importamos la función que me permite conectarme a la base de datos.
import { getPool } from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos para actualizar un criterio de busqueda favorito del usuario.
const updateUserFavoriteModel = async (
    favoriteId,
    title = null,
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    userId,
) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Verificamos si ya existe un favorite con los nuevos valores.
    const [[existingFavorite]] = await pool.query(
        `SELECT favoriteId FROM favorites WHERE origin = ? AND destination = ? 
        AND departureDate = ? AND returnDate = ? AND adults = ? AND userId = ? AND favoriteId != ?`,
        [
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
            userId,
            favoriteId,
        ],
    );

    // Si el favorito con estos valores existe no se actualiza.
    if (existingFavorite) {
        throw generateErrorUtil(
            'Ya existe un criterio de busqueda en favoritos con estos valores',
            409,
        );
    }

    // Insertamos el listado de criterios de busqueda favoritos a la base de datos con el id del usuario.
    const [updatedFavorite] = await pool.query(
        `UPDATE favorites SET title = ?, origin = ?, destination = ?, departureDate = ?, returnDate = ?, adults = ?
        WHERE favoriteId = ? AND userId = ?`,
        [
            title,
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
            favoriteId,
            userId,
        ],
    );

    // Verificamos si se actualizó algún favorito.
    if (updatedFavorite.affectedRows === 0) {
        throw generateErrorUtil(
            'No se pudo actualizar la busqueda favorita',
            404,
        );
    }

    // Obtenemos el id del criterio de busqueda que acabamos de insertar.
    return favoriteId;
};

export default updateUserFavoriteModel;
