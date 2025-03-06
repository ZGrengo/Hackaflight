import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import FlightCard from '../components/FlightCard';
import FlightFilters from '../components/FlightFilters';
import Header from '../components/Header';

const { VITE_API_URL } = import.meta.env;

const SearchResultsPage = () => {
    const location = useLocation();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    // Renderizar resultados
    if (flights.length === 0) {
        return (
            <>
                <Header />
                <section>
                    <FlightFilters onFilterChange={handleFilterChange} />
                    <h2>Resultados de la Búsqueda</h2>
                    {loading && <p>Cargando...</p>}
                    {error && <p>Error: {error}</p>}
                    <section className='flight-cards-container'>
                        <FlightCard
                            flight={{
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
                                                departureTime:
                                                    '2022-12-01T08:00:00',
                                                arrivalTime:
                                                    '2022-12-01T09:00:00',
                                                duration: 60,
                                            },
                                        ],
                                    },
                                ],
                            }}
                        />
                        <FlightCard
                            flight={{
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
                                                departureTime:
                                                    '2022-12-01T10:00:00',
                                                arrivalTime:
                                                    '2022-12-01T11:00:00',
                                                duration: 60,
                                            },
                                        ],
                                    },
                                ],
                            }}
                        />
                        <FlightCard
                            flight={{
                                id: '3',
                                price: 300,
                                currency: 'USD',
                                itineraries: [
                                    {
                                        id: '3',
                                        segments: [
                                            {
                                                id: '3',
                                                origin: 'MEX',
                                                destination: 'LAX',
                                                departureTime:
                                                    '2022-12-01T12:00:00',
                                                arrivalTime:
                                                    '2022-12-01T15:00:00',
                                                duration: 180,
                                            },
                                            {
                                                id: '4',
                                                origin: 'LAX',
                                                destination: 'SFO',
                                                departureTime:
                                                    '2022-12-01T17:00:00',
                                                arrivalTime:
                                                    '2022-12-01T18:30:00',
                                                duration: 90,
                                            },
                                        ],
                                    },
                                ],
                            }}
                        />
                        <FlightCard
                            flight={{
                                id: '4',
                                price: 400,
                                currency: 'USD',
                                itineraries: [
                                    {
                                        id: '4',
                                        segments: [
                                            {
                                                id: '5',
                                                origin: 'CUN',
                                                destination: 'JFK',
                                                departureTime:
                                                    '2022-12-01T09:00:00',
                                                arrivalTime:
                                                    '2022-12-01T13:00:00',
                                                duration: 240,
                                            },
                                            {
                                                id: '6',
                                                origin: 'JFK',
                                                destination: 'LHR',
                                                departureTime:
                                                    '2022-12-01T15:00:00',
                                                arrivalTime:
                                                    '2022-12-02T05:00:00',
                                                duration: 420,
                                            },
                                        ],
                                    },
                                ],
                            }}
                        />
                        <FlightCard
                            flight={{
                                id: '5',
                                price: 500,
                                currency: 'USD',
                                itineraries: [
                                    {
                                        id: '5',
                                        segments: [
                                            {
                                                id: '7',
                                                origin: 'LAX',
                                                destination: 'NRT',
                                                departureTime:
                                                    '2022-12-01T08:00:00',
                                                arrivalTime:
                                                    '2022-12-02T12:00:00',
                                                duration: 720,
                                            },
                                            {
                                                id: '8',
                                                origin: 'NRT',
                                                destination: 'SIN',
                                                departureTime:
                                                    '2022-12-02T14:00:00',
                                                arrivalTime:
                                                    '2022-12-02T20:00:00',
                                                duration: 360,
                                            },
                                        ],
                                    },
                                ],
                            }}
                        />
                        <FlightCard
                            flight={{
                                id: '6',
                                price: 600,
                                currency: 'USD',
                                itineraries: [
                                    {
                                        id: '6',
                                        segments: [
                                            {
                                                id: '9',
                                                origin: 'SFO',
                                                destination: 'ICN',
                                                departureTime:
                                                    '2022-12-01T10:00:00',
                                                arrivalTime:
                                                    '2022-12-02T15:00:00',
                                                duration: 780,
                                            },
                                            {
                                                id: '10',
                                                origin: 'ICN',
                                                destination: 'HND',
                                                departureTime:
                                                    '2022-12-02T17:00:00',
                                                arrivalTime:
                                                    '2022-12-02T19:30:00',
                                                duration: 150,
                                            },
                                        ],
                                    },
                                ],
                            }}
                        />
                    </section>
                </section>
            </>
        );
    }

    return (
        <>
            <Header />
            <section>
                <FlightFilters onFilterChange={handleFilterChange} />
                <h2>Resultados de la Búsqueda</h2>
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
        </>
    );
};

export default SearchResultsPage;
