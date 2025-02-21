// Importamos la función que me permite conectarme a la base de datos.
import { getPool } from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que se conecta a la base de datos para crear un nuevo usuario.
const selectUserFavoriteModel = async (favoriteId, userId) => {
    // Obtenemos el pool.
    const pool = await getPool();

    // Si el favoriteId es un número, buscamos el favorito con ese id. De lo contrario, buscamos todos los favoritos del usuario.
    if (favoriteId) {
        // Obtenemos el criterio de busqueda favorito que coincida con el id que recibimos por parámetro.
        const [favorite] = await pool.query(
            `
                SELECT * from favorites WHERE favoriteId = ? AND userId = ?
            `,
            [favoriteId, userId],
        );

        // Si no encuentra el favorito, generamos un error 404.
        if (favorite.length === 0) {
            throw generateErrorUtil(
                'Criterio de búsqueda favorito no encontrado',
                404,
            );
        }
        // Devolvemos el criterio de busqueda favorito.
        return favorite[0];
    } else {
        const [favorites] = await pool.query(
            `
                SELECT * from favorites WHERE userId = ? ORDER BY createdAt DESC
            `,
            [userId],
        );
        return favorites;
    }
};

export default selectUserFavoriteModel;
