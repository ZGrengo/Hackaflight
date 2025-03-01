// Inicializamos el componente.
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';

const { VITE_API_URL } = import.meta.env;

const FavoriteDetailsEditPage = () => {
    const [favorites, setFavorite] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { favoriteId } = useParams();
    const { authToken, authUser } = useAuthContext();
// Obtenemos la lista de favoritos del usuario.
useEffect(()=> {
    const fetchFavorites = async () => {
    try {
        const res = await fetch(
            `${VITE_API_URL}/api/users/favorites/${favoriteId}`,
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
                setFavorite(body.data.favorites);
    
    } catch (err) {
        setError(err.message);
        
    } finally {
        setLoading(false);
    }
};

if (authToken && authUser) { // Solo ejecuta si existen
    fetchFavorites();
}
}, [favoriteId, authToken, authUser]);

//Toggle para permitir editar un favorito.
const handleEditToggle = () => setIsEditing(!isEditing);

//Cambiamos el valor de un input al editar un favorito.
const handleChange = (e) => {
    setFavorite({
        ...favorites,
        [e.target.name]: e.target.value,
    });
};

//Guardamos los cambios realizados en el favorito.
const handleSave = async () => {
    try {
        const res = await fetch(`${VITE_API_URL}/favorites/${favoriteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(favorites),
        });

        // Obtenemos el body.
        const body = await res.json();
        
        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
            throw new Error(body.message);
        }
        setIsEditing(false);
        alert('Busqueda actualizada con exito');
    } catch (err) {
        console.error(err.message);
    }
};

//Buscamos el vuelo favorito del usuario
const handleFavoriteSearch = async () => {
try {
    const res = await fetch(
        `${VITE_API_URL}/api/flights/search?origin=${favorites.origin}&destination=${favorites.destination}&departureDate=${favorites.departureDate}&adults=${favorites.adults}`);
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
if (loading) return <p>Cargando favorito...</p>;
if (error) return <p>Error: {error}</p>;

// Mostramos la lista de favoritos.
    return (
        <main>
            <h2>Lista de busquedas favoritas</h2>
            <form>
                <label>Destino:</label>
                <input type="text" name="destination" value={favorites?.destination || ""} onChange={handleChange} readOnly={!isEditing} />

                <label>Origen:</label>
                <input type="text" name="origin" value={favorites?.origin || ""} onChange={handleChange} readOnly={!isEditing} />

                <label>Fecha de Salida:</label>
                <input type="date" name="departureDate" value={favorites?.departureDate ? new Date(favorites.departureDate).toISOString().split('T')[0] : ""} onChange={handleChange} readOnly={!isEditing} />

                <label>Fecha de Regreso:</label>
                <input type="date" name="returnDate" value={favorites?.returnDate ? new Date(favorites.returnDate).toISOString().split('T')[0] : ""} onChange={handleChange} readOnly={!isEditing} />

                <label>Adultos:</label>
                <input type="number" name="adults" value={favorites?.adults || 0} onChange={handleChange} readOnly={!isEditing} />

                <button type="button" onClick={handleEditToggle}>
                
                    {isEditing ? 'Cancelar' : 'Editar'}
                </button>

                {isEditing && <button type="button" onClick={handleSave}>Guardar</button>}

                <button disabled={isEditing} onClick={handleFavoriteSearch} >Ver vuelos</button>
            </form>
        </main>
    );
};

export default FavoriteDetailsEditPage;
