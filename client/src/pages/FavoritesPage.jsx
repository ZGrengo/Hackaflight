// Inicializamos el componente.
import { useEffect, useState } from 'react';

const { VITE_API_URL } = import.meta.env;

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
// Obtenemos la lista de favoritos del usuario.
useEffect(()=> {
    const fetchFavorites = async () => {
    try {
        const res = await fetch(
            `${VITE_API_URL}/api/users/favorites`,
            {
                headers: authUser
                    ? {
                          Authorization: authToken,
                      }
                    : {},
            }
        );
                // Obtenemos el body.
                const body = await res.json();
    
                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }
                setFavorites(body.data);
    
    } catch (err) {
        setError(err.message);
        
    } finally {
        setLoading(false);
    }
};

fetchFavorites();
}, []);

//Buscamos el vuelo favorito del usuario
const handleFavoriteSearch = async () => {
try {
    const res = await fetch(
        `${VITE_API_URL}/api/flights/search?origin=${favorite.origin}&destination=${favorite.destination}&departureDate=${favorite.departureDate}&adults=${favorite.adults}`);
            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

} catch (err) {
    console.error(err.message);
    
}
};

if (loading) return <p>Cargando favoritos...</p>;
if (error) return <p>Error: {error}</p>;

// Mostramos la lista de favoritos.
    return (
        <main>
            <h2>Lista de busquedas favoritas</h2>
        <ul>
            {favorites.map((favorite) => (
                <>
                <li key={favorite.favoriteId}>
                    {favorite.title} : Desde {favorite.origin} a {favorite.destination} con fecha de salida {favorite.departureDate} para {favorite.adults} adultos.
                </li>
                <button onClick={() => handleFavoriteSearch(favorite)}>Ver vuelos</button>
             </>
            ))}
        </ul>
        </main>
    );
};

export default FavoritesPage;
