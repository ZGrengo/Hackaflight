// Inicializamos el componente.
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

const { VITE_API_URL } = import.meta.env;

const FavoriteDetailsEditPage = () => {
    const [favorites, setFavorite] = useState({});
    const [loading, setLoading] = useState(true);
    const [initialFavorites, setInitialFavorites] = useState({});
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { favoriteId } = useParams();
    const { authToken, authUser } = useAuthContext();
    // Obtenemos la lista de favoritos del usuario.
    useEffect(() => {
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
                    },
                );
                // Obtenemos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }
                setFavorite(body.data.favorites);
                setInitialFavorites(body.data.favorites);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (authToken && authUser) {
            // Solo ejecuta si existen
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

    //Formato de la fecha para que pueda ser enviada al endpoint de actualización de favoritos.
    const formatDate = (date) => {
        if (!date) return null; // Si la fecha es null, no la formateamos
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha (sin hora)
    };

    //Guardamos los cambios realizados en el favorito.
    const handleSave = async () => {
        try {
            const formattedFavorites = {
                title: favorites.title,
                origin: favorites.origin,
                destination: favorites.destination,
                departureDate: formatDate(favorites.departureDate),
                returnDate: favorites.returnDate
                    ? formatDate(favorites.returnDate)
                    : null,
                adults: favorites.adults,
            };

            console.log(formattedFavorites);

            // Enviamos los cambios al endpoint de actualización de favoritos.
            const res = await fetch(
                `${VITE_API_URL}/api/users/favorites/${favoriteId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify(formattedFavorites),
                },
            );

            // Obtenemos el body.
            const body = await res.json();
            console.log(body);
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

    const handleCancel = () => {
        setFavorite(initialFavorites); // Restauramos el estado inicial
        setIsEditing(false); // Dejamos de editar
    };

    if (loading) return <p>Cargando favorito...</p>;
    if (error) return <p>Error: {error}</p>;

    // Mostramos la lista de favoritos.
    return (
        <>
            <Header />
            <main className='bg-light-blue p-8 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10'>
                <h2 className='text-center text-dark-blue text-3xl mb-6'>
                    Detalles del Favorito
                </h2>
                <form>
                    <div className='mb-6'>
                        <label
                            htmlFor='title'
                            className='block text-base font-medium text-dark-blue mb-2'
                        >
                            Titulo
                        </label>
                        <input
                            type='text'
                            name='title'
                            value={favorites.title || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className='w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none'
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='destination'
                            className='block text-base font-medium text-dark-blue mb-2'
                        >
                            Destino
                        </label>
                        <input
                            type='text'
                            name='destination'
                            value={favorites.destination || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className='w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none'
                        />
                    </div>

                    <div className='mb-6'>
                        <label
                            htmlFor='origin'
                            className='block text-base font-medium text-dark-blue mb-2'
                        >
                            Origen
                        </label>
                        <input
                            type='text'
                            name='origin'
                            value={favorites.origin || ''}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className='w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none'
                        />
                    </div>

                    <div className='mb-6'>
                        <label
                            htmlFor='departureDate'
                            className='block text-base font-medium text-dark-blue mb-2'
                        >
                            Fecha de Salida
                        </label>
                        <input
                            type='date'
                            name='departureDate'
                            value={
                                favorites?.departureDate
                                    ? new Date(favorites.departureDate)
                                          .toISOString()
                                          .split('T')[0]
                                    : ''
                            }
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className='w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none'
                        />
                    </div>

                    <div className='mb-6'>
                        <label
                            htmlFor='returnDate'
                            className='block text-base font-medium text-dark-blue mb-2'
                        >
                            Fecha de Regreso
                        </label>
                        <input
                            type='date'
                            name='returnDate'
                            value={
                                favorites?.returnDate
                                    ? new Date(favorites.returnDate)
                                          .toISOString()
                                          .split('T')[0]
                                    : ''
                            }
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className='w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none'
                        />
                    </div>

                    <div className='mb-6'>
                        <label
                            htmlFor='adults'
                            className='block text-base font-medium text-dark-blue mb-2'
                        >
                            Adultos
                        </label>
                        <input
                            type='number'
                            name='adults'
                            value={favorites.adults || 1}
                            onChange={handleChange}
                            readOnly={!isEditing}
                            className='w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-medium-blue focus:outline-none'
                        />
                    </div>

                    <div className='flex justify-between items-center'>
                        {isEditing && (
                            <button
                                type='button'
                                onClick={handleCancel}
                                className={`${
                                    isEditing
                                        ? 'bg-accent-blue'
                                        : 'bg-medium-blue'
                                } text-white py-2 px-4 rounded-md hover:bg-medium-blue focus:outline-none`}
                                disabled={!isEditing}
                            >
                                Cancelar
                            </button>
                        )}
                        {!isEditing && (
                            <button
                                type='button'
                                onClick={handleEditToggle}
                                className='bg-accent-blue text-white py-2 px-4 rounded-md hover:bg-medium-blue focus:outline-none'
                            >
                                Editar
                            </button>
                        )}
                        {isEditing && (
                            <button
                                type='button'
                                onClick={handleSave}
                                className='bg-medium-blue text-white py-2 px-4 rounded-md hover:bg-accent-blue focus:outline-none'
                            >
                                Guardar
                            </button>
                        )}
                        <button
                            disabled={isEditing}
                            onClick={handleFavoriteSearch}
                            className='bg-light-blue text-dark-blue py-2 px-4 rounded-md hover:bg-accent-blue focus:outline-none'
                        >
                            Ver Vuelos
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default FavoriteDetailsEditPage;
