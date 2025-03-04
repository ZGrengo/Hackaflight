import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext.js';

const { VITE_API_URL } = import.meta.env;
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                console.error('Error en fetchFavorites:', err);
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

            setFavorites((prevFavorites) =>
                prevFavorites.filter((fav) => fav.favoriteId !== favoriteId),
            );
            alert('Búsqueda borrada con éxito');
        } catch (err) {
            console.error('Error eliminando favorito:', err.message);
        }
    };

    if (loading)
        return (
            <p className='text-center text-lg text-gray-600'>
                Cargando favoritos...
            </p>
        );
    if (error)
        return <p className='text-center text-red-500'>Error: {error}</p>;

    return (
        <>
            <Header />
            <main className='max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
                <h2 className='text-3xl font-semibold text-center text-dark-blue mb-6'>
                    Lista de Búsquedas Favoritas
                </h2>

                {favorites.length === 0 ? (
                    <p className='text-center text-gray-500'>
                        No tienes búsquedas favoritas aún.
                    </p>
                ) : (
                    <ul className='space-y-4'>
                        {favorites.map((favorite) => (
                            <li
                                key={favorite.favoriteId}
                                className='bg-gray-100 p-4 rounded-lg shadow-sm'
                            >
                                <p className='text-lg font-medium text-gray-800'>
                                    {favorite.title}: Desde{' '}
                                    <span className='text-medium-blue'>
                                        {favorite.origin}
                                    </span>{' '}
                                    a{' '}
                                    <span className='text-medium-blue'>
                                        {favorite.destination}
                                    </span>
                                </p>
                                <p className='text-sm text-gray-600'>
                                    Fecha de salida:{' '}
                                    {new Date(
                                        favorite.departureDate,
                                    ).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}{' '}
                                    | Adultos: {favorite.adults}
                                </p>

                                <div className='mt-3 flex flex-wrap gap-2'>
                                    <button
                                        onClick={() =>
                                            handleFavoriteSearch(favorite)
                                        }
                                        className='bg-medium-blue text-white px-4 py-2 rounded-md hover:bg-dark-blue transition'
                                    >
                                        Ver Vuelos
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteFavorite(
                                                favorite.favoriteId,
                                            )
                                        }
                                        className='bg-transparent text-gray-700 px-4 py-2 rounded-md hover:bg-dark-blue hover:text-white transition'
                                    >
                                        Borrar
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/favorites/${favorite.favoriteId}`,
                                            )
                                        }
                                        className='bg-light-yellow text-dark-blue px-4 py-2 rounded-md border-2 hover:border-dark-blue'
                                    >
                                        Editar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
};

export default FavoritesPage;
