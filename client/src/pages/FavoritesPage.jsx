// Inicializamos el componente.
import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext.js';
const { VITE_API_URL } = import.meta.env;

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken, authUser } = useAuthContext();
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
}, [authToken, authUser]);
//Buscamos el vuelo favorito del usuario
const handleFavoriteSearch = async (favorite) => {
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

// Funcion para borrar un favorito del usuario.
const handleDeleteFavorite = async (favoriteId) => {
    try {
        const res = await fetch(`${VITE_API_URL}/favorites/${favoriteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Obtenemos el body.
        const body = await res.json();
        
        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
            throw new Error(body.message);
        }
        
        // Borramos el favorito de la lista.
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.favoriteId !== favoriteId));
        
        // Avisamos al usuario.
        alert('Busqueda borrada con exito');
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
                <button onClick={() => handleDeleteFavorite(favorite.favoriteId)}>Borrar Favorito</button>
             </>
            ))}
        </ul>
        </main>
    );
};

export default FavoritesPage;
