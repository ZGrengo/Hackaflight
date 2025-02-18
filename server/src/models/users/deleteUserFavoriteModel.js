// Importamos la función que me permite conectarme a la base de datos.
import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos para borrar un criterio de busqueda.
const deleteUserFavoriteModel = async (favoriteId, userId) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Obtenemos el listado de criterios de busqueda favoritos que tengan el id que recibimos.
    const [favorite] = await pool.query(
        `SELECT favoriteId FROM favorites WHERE favoriteId = ? AND userId = ?`,
        [favoriteId, userId],
    );
    // Si no se encontró el criterio de busqueda favorito, generamos un error.
    if (favorite.length === 0) {
        throw generateErrorUtil(
            'Criterio de busqueda favorito no encontrado',
            404,
        );
    }

    // Borramos el criterio de busqueda favorito de la tabla.
    await pool.query(
        `
            DELETE FROM favorites WHERE favoriteId = ?
        `,
        [favoriteId],
    );
    // Devolvemos el id borrado.
    return favoriteId;
};

export default deleteUserFavoriteModel;
