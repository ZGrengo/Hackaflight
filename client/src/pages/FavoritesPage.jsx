import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext.js";
import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authToken } = useAuthContext();

    useEffect(() => {
        if (!authToken) return;

        const fetchFavorites = async () => {
            try {
                console.log('Cargando favoritos...');
                const res = await fetch(`${VITE_API_URL}/api/users/favorites`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                const body = await res.json();
                if (!res.ok) {
                    throw new Error(body.message || 'Error desconocido');
                }

                setFavorites(body.data.favorites);
            } catch (err) {
      toast.error(err.message, {
        id: 'favoriteId',
    });
    
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

        if (favorite.returnDate) {
            searchParams.append('returnDate', favorite.returnDate);
        }

        navigate(`/?${searchParams.toString()}`);
    };

    const handleDeleteFavorite = async (favoriteId) => {
        try {
            const res = await fetch(
                `${VITE_API_URL}/api/users/favorites/${favoriteId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: authToken,
                    },
                },
            );

            const body = await res.json();
            if (!res.ok) {
                throw new Error(body.message || 'Error al eliminar favorito');
            }

            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.favoriteId !== favoriteId));
            toast.success("Búsqueda borrada con éxito");
        } catch (err) {
            toast.error(err.message, {
                id: 'favoriteId',
            });
        }
    };

    if (loading) return <p className="text-center text-lg text-gray-600">Cargando favoritos...</p>;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />
    
            {/* Contenido Principal (ocupa el espacio restante) */}
            <main className="flex-grow w-full max-w-4xl mx-auto mt-6 p-4 sm:p-6 bg-white rounded-lg shadow-md mb-10">
                <h2 className="text-2xl sm:text-3xl font-semibold text-center text-dark-blue mb-4 sm:mb-6">
                    Lista de Búsquedas Favoritas
                </h2>
    
                {favorites.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No tienes búsquedas favoritas aún.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {favorites.map((favorite) => (
                            <li
                                key={favorite.favoriteId}
                                className="bg-gray-100 p-4 rounded-lg shadow-sm"
                            >
                                <p className="text-base sm:text-lg font-medium text-gray-800">
                                    {favorite.title}: Desde{' '}
                                    <span className="text-medium-blue">
                                        {favorite.origin}
                                    </span>{' '}
                                    a{' '}
                                    <span className="text-medium-blue">
                                        {favorite.destination}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Fecha de salida:{' '}
                                    {new Date(favorite.departureDate).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}{' '}
                                    | Adultos: {favorite.adults}
                                </p>
    
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleFavoriteSearch(favorite)}
                                        className="bg-medium-blue text-white px-4 py-2 rounded-md hover:bg-dark-blue transition text-sm sm:text-base"
                                    >
                                        Ver Vuelos
                                    </button>
                                    <button
                                        onClick={() => handleDeleteFavorite(favorite.favoriteId)}
                                        className="bg-transparent text-gray-700 px-4 py-2 rounded-md hover:bg-dark-blue hover:text-white transition text-sm sm:text-base"
                                    >
                                        Borrar
                                    </button>
                                    <button
                                        onClick={() => navigate(`/favorites/${favorite.favoriteId}`)}
                                        className="bg-light-yellow text-dark-blue px-4 py-2 rounded-md border-2 hover:border-dark-blue text-sm sm:text-base"
                                    >
                                        Editar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default FavoritesPage;
