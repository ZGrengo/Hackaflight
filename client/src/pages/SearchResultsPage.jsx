import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FlightCard from '../components/FlightCard';
import FlightFilters from '../components/FlightFilters';
import useAuthContext from '../hooks/useAuthContext.js';
import Header from '../components/Header.jsx';

const { VITE_API_URL } = import.meta.env;

const SearchResultsPage = () => {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);
    const [title, setTitle] = useState('');
    const { searchParams = {} } = location.state || {};
    const [flights, setFlights] = useState(location.state?.flights ?? []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authToken } = useAuthContext();

    // Cargar vuelos iniciales desde el estado de la ubicación
    useEffect(() => {
        if (location.state?.flights) {
            setFlights(location.state.flights);
        }
    }, [location.state?.flights]);

    // Manejar cambios en los filtros
    const handleFilterChange = async (filters) => {
        setLoading(true);
        setError(null);
        try {
            console.log('Filters applied:', filters);

            // Filtrar los parámetros vacíos
            const searchParams = new URLSearchParams();
            Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                    searchParams.append(key, filters[key]);
                }
            });
            console.log('Filtered parameters:', searchParams.toString());

            // Realizar la petición a la API para vuelos filtrados
            const res = await fetch(
                `${VITE_API_URL}/api/flights/filter?${searchParams.toString()}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            console.log('Response:', res);

            // Manejar la respuesta de la API
            if (res.status === 400)
                throw new Error('El filtro no es aplicable');
            if (!res.ok) throw new Error('Network response was not ok');
            const body = await res.json();

            console.log('Response body:', body);
            if (body.status === 'error') throw new Error(body.message);

            // Actualizar los vuelos con los datos filtrados
            const filteredFlights = body.data || [];
            setFlights(filteredFlights);

            filteredFlights.forEach((flight, index) => {
                console.log(
                    `Filtered Flight ${index} itineraries:`,
                    flight.itineraries,
                );
            });

            console.log('Filtered flights data:', filteredFlights);
            console.log('Updated flights state:', filteredFlights);
        } catch (err) {
            console.log('Error al filtrar vuelos:', err);
            console.log('Error message:', err.message);
            console.log('Error stack:', err.stack);
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Renderizar resultados por defecto en caso de caida de AMADEUS
    useEffect(() => {
        if (!location.state?.flights || location.state.flights.length === 0) {
            console.warn("No flights received from API. Using default flights.");
            setFlights([
                {
                    id: '1',
                    price: 100,
                    currency: 'USD',
                    itineraries: [
                        {
                            id: '1',
                            segments: [
                                {
                                    id: '1',
                                    origin: 'MEX',
                                    destination: 'CUN',
                                    departureTime: '2022-12-01T08:00:00',
                                    arrivalTime: '2022-12-01T09:00:00',
                                    duration: 60,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: '2',
                    price: 200,
                    currency: 'USD',
                    itineraries: [
                        {
                            id: '2',
                            segments: [
                                {
                                    id: '2',
                                    origin: 'CUN',
                                    destination: 'MEX',
                                    departureTime: '2022-12-01T10:00:00',
                                    arrivalTime: '2022-12-01T11:00:00',
                                    duration: 60,
                                },
                            ],
                        },
                    ],
                },
            ]);
        } else {
            setFlights(location.state.flights);
        }
    }, [location.state?.flights]);

    const handleSave = async () => {
        try {
            const formattedFavorites = {
                title:
                    title.trim() ||
                    `${searchParams.origin} - ${searchParams.destination}`,
                origin: searchParams.origin,
                destination: searchParams.destination,
                departureDate: searchParams.departureDate,
                returnDate: searchParams.returnDate || null,
                adults: searchParams.adults,
            };
            // Enviamos los cambios al endpoint de actualización de favoritos.
            const res = await fetch(`${VITE_API_URL}/api/users/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(formattedFavorites),
            });
            // Obtenemos el body.
            const body = await res.json();
            if (!res.ok) throw new Error(body.message);
            setIsSaved(true);
            toast.success(body.message);
        } catch (err) {
            toast.error(err.message, {
                id: 'favoriteId',
            });
        }
    };
    return (
        <>
            <Header />
            <section>
                <FlightFilters onFilterChange={handleFilterChange} />
            {authToken && (
                <div className="w-full max-w-lg mx-auto mt-4 p-4 sm:p-6">
    {/* Titulo de la búsqueda */}
    <input
        type='text'
        placeholder='Titulo de la búsqueda'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name='title'
        className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-medium-blue focus:border-medium-blue mb-4"
    />
    {/* Botón de guardar */}
    <div className="text-center">
        <button
            onClick={handleSave}
            disabled={isSaved}
            className={`${
                isSaved ? 'bg-gray-400' : 'bg-medium-blue'
            } text-white px-6 py-2 rounded-md hover:bg-dark-blue transition-all text-sm sm:text-base`}
        >
            {isSaved ? 'Guardado' : 'Guardar Búsqueda'}
        </button>
    </div>
</div>
            )}
                <section className="w-full max-w-4xl mx-auto mt-6 p-4 sm:p-6 bg-white rounded-lg shadow-md mb-10">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-center text-dark-blue mb-4 sm:mb-6">Resultados de la Búsqueda</h2>
                    {loading && <p>Cargando...</p>}
                    {error && <p>Error: {error}</p>}
                    <section className='flight-cards-container'>
                        {flights.map((flight, index) => (
                            <FlightCard
                                key={`${flight.id}-${index}`}
                                flight={flight}
                            />
                        ))}
                    </section>
                </section>
            </section>
        </>
    );
};

export default SearchResultsPage;
