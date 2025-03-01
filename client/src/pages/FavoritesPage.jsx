import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext.js";

const { VITE_API_URL } = import.meta.env;
import { useNavigate } from "react-router-dom";



const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuthContext();

    useEffect(() => {
        if (!authToken) return;


        const fetchFavorites = async () => {
            try {
                console.log("Cargando favoritos...");
                const res = await fetch(`${VITE_API_URL}/api/users/favorites`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                const body = await res.json();
                if (!res.ok) {
                    throw new Error(body.message || "Error desconocido");
                }

                setFavorites(body.data.favorites);
            } catch (err) {
                console.error("Error en fetchFavorites:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [authToken]);
    const navigate = useNavigate();
    const handleFavoriteSearch = async (favorite) => {
        const searchParams = new URLSearchParams({
            origin: favorite.origin,
            destination: favorite.destination,
            departureDate: favorite.departureDate,
            adults: favorite.adults,
        });
    
        navigate(`/?${searchParams.toString()}`);
    };

    const handleDeleteFavorite = async (favoriteId) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/users/favorites/${favoriteId}`, {
                method: "DELETE",
                headers: {
                    Authorization: authToken,
                },
            });

            const body = await res.json();
            if (!res.ok) {
                throw new Error(body.message || "Error al eliminar favorito");
            }

            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.favoriteId !== favoriteId));
            alert("Búsqueda borrada con éxito");
        } catch (err) {
            console.error("Error eliminando favorito:", err.message);
        }
    };

    if (loading) return <p>Cargando favoritos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <h2>Lista de búsquedas favoritas</h2>
            <ul>
                
                {favorites.map((favorite) => (
                        <li key={favorite.favoriteId}>
                            {favorite.title}: Desde {favorite.origin} a {favorite.destination} con fecha de salida {new Date(favorite.departureDate).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })} para {favorite.adults} adultos.
                            <button onClick={() => handleFavoriteSearch(favorite)}>Ver vuelos</button>
                            <button onClick={() => handleDeleteFavorite(favorite.favoriteId)}>Borrar Favorito</button>
                            <button onClick={()=> {navigate(`/favorites/${favorite.favoriteId}`)}}>Editar Favorito</button>
                        </li>

                ))}
            </ul>
        </main>
    );
};

export default FavoritesPage;