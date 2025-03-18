import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlightCard from '../components/FlightCard';
import FlightFilters from '../components/FlightFilters';
import Header from '../components/Header';
import useAuthContext from '../hooks/useAuthContext';
import toast from 'react-hot-toast';
import ScrollToTopButton from '../components/ScrollTopButton';

// obtiene la variable de entorno
const { VITE_API_URL } = import.meta.env;

// definimos la página de resultados de búsqueda
const SearchResultsPage = () => {
    // obtiene la ubicación actual
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);
    const [title, setTitle] = useState('');
    const { searchParams = {} } = location.state || {};
    const [flights, setFlights] = useState(location.state?.flights ?? []);
    const { authToken } = useAuthContext();

    // actualiza los vuelos cuando cambia la ubicación

    useEffect(() => {
        if (location.state?.flights) {
            console.log('Location state flights:', location.state.flights);
            location.state.flights.forEach((flight, index) => {
                console.log(`Flight ${index} itineraries:`, flight.itineraries);
            });
            setFlights(location.state.flights);
            console.log(
                'Initial flights data after setFlights:',
                location.state.flights,
            );
        }
    }, [location.state?.flights]);

    // función para manejar el cambio de filtros
    const handleFilterChange = async (filters) => {
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
            if (!res.ok)
                throw new Error(
                    'Se ha producido un error al filtrar los vuelos. Por favor, inténtalo de nuevo con otros parámetros.',
                );
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
        }
    };

    useEffect(() => {
        if (!location.state?.flights || location.state.flights.length === 0) {
            console.warn(
                'No flights received from API. Using default flights.',
            );
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

    const getAirlines = (itineraries) => {
        const airlines = new Set();
        itineraries.forEach((itinerary) => {
            itinerary.segments.forEach((segment) => {
                airlines.add(segment.carrierCode);
            });
        });
        return Array.from(airlines).join(', ');
    };

    // Obtener las aerolíneas visibles de los vuelos
    const getVisibleAirlines = (flights) => {
        const airlines = new Set();
        flights.forEach((flight) => {
            const airlinesInFlight = getAirlines(flight.itineraries); // Usa la función getAirlines para obtener las aerolíneas
            airlinesInFlight
                .split(', ')
                .forEach((airline) => airlines.add(airline));
        });
        return Array.from(airlines); // Devuelve un array con las aerolíneas únicas
    };

    const visibleAirlines = getVisibleAirlines(flights); // Llama a la función para obtener las aerolíneas de los vuelos

    // Mostrar un mensaje si no hay vuelos
    if (!flights.length) {
        return <p>No se encontraron resultados de búsqueda.</p>;
    }

    // Renderizar la página de resultados de búsqueda
    return (
        <>
            <Header />
            <section className='bg-light-blue p-4'>
                {/* Contenedor de filtros y resultados con diseño flexible */}
                <div className='flex flex-col md:flex-row gap-4'>
                    {/* Sección de Filtros (izquierda) */}
                    <aside className='w-full md:w-1/4'>
                        <div className='sticky top-4 space-y-12'>
                            {/* Filtros de búsqueda */}
                            <div className='p-4 bg-white rounded-lg shadow-md'>
                                <FlightFilters
                                    onFilterChange={handleFilterChange}
                                    visibleAirlines={visibleAirlines}
                                />
                            </div>

                            {/* Guardar búsqueda (Solo si hay autenticación) */}
                            {authToken && (
                                <div className='p-4 bg-white rounded-lg shadow-md'>
                                    <input
                                        type='text'
                                        placeholder='Título de la búsqueda'
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        name='title'
                                        className='w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-medium-blue focus:border-medium-blue mb-4'
                                    />
                                    <ul className='space-y-4'>
                                        <li
                                            key={searchParams.favoriteId}
                                            className='bg-gray-100 p-4 rounded-lg shadow-sm'
                                        >
                                            <p className='text-base sm:text-lg font-medium text-gray-800'>
                                                Desde{' '}
                                                <span className='text-medium-blue'>
                                                    {searchParams.origin}
                                                </span>{' '}
                                                a{' '}
                                                <span className='text-medium-blue'>
                                                    {searchParams.destination}
                                                </span>
                                            </p>
                                            <p className='text-sm text-gray-600'>
                                                Fecha de salida:{' '}
                                                {new Date(
                                                    searchParams.departureDate,
                                                ).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}{' '}
                                                {searchParams.returnDate
                                                    ? `- Fecha de retorno: ${new Date(
                                                          searchParams.returnDate,
                                                      ).toLocaleDateString(
                                                          'es-ES',
                                                          {
                                                              day: '2-digit',
                                                              month: 'long',
                                                              year: 'numeric',
                                                          },
                                                      )}  `
                                                    : ''}
                                                | Adultos: {searchParams.adults}
                                            </p>
                                        </li>
                                    </ul>
                                    <div className='text-center'>
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaved}
                                            className={`${
                                                isSaved
                                                    ? 'bg-gray-400'
                                                    : 'bg-medium-blue'
                                            } text-white px-6 mt-4 py-2 rounded-md hover:bg-dark-blue transition-all text-sm sm:text-base`}
                                        >
                                            {isSaved
                                                ? 'Guardado'
                                                : 'Guardar Búsqueda'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Sección de Resultados (derecha) */}
                    <main className='w-full md:w-4/5'>
                        {/* Resultados de la Búsqueda */}
                        <section className='mt-6'>
                            <h2 className='text-2xl sm:text-3xl font-semibold text-center text-dark-blue mb-4'>
                                Resultados de la Búsqueda
                            </h2>
                            <div className='flex flex-col items-center justify-center p-4 rounded-lg'>
                                {flights.length > 0 ? (
                                    flights.map((flight, index) => (
                                        <FlightCard
                                            key={`${flight.id}-${index}`}
                                            flight={flight}
                                            searchParams={searchParams}
                                        />
                                    ))
                                ) : (
                                    <p className='text-gray-700'>
                                        No hay vuelos que coincidan con los
                                        filtros.
                                    </p>
                                )}
                                <ScrollToTopButton />
                            </div>
                        </section>
                    </main>
                </div>
            </section>
        </>
    );
};

// Definir las propiedades requeridas para la página de resultados de búsqueda
SearchResultsPage.propTypes = {
    flights: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            source: PropTypes.string.isRequired,
            instantTicketingRequired: PropTypes.bool.isRequired,
            nonHomogeneous: PropTypes.bool.isRequired,
            oneWay: PropTypes.bool.isRequired,
            isUpsellOffer: PropTypes.bool.isRequired,
            lastTicketingDate: PropTypes.string.isRequired,
            lastTicketingDateTime: PropTypes.string.isRequired,
            numberOfBookableSeats: PropTypes.number.isRequired,
            itineraries: PropTypes.arrayOf(
                PropTypes.shape({
                    duration: PropTypes.string.isRequired,
                    segments: PropTypes.arrayOf(
                        PropTypes.shape({
                            departure: PropTypes.shape({
                                iataCode: PropTypes.string.isRequired,
                                terminal: PropTypes.string,
                                at: PropTypes.string.isRequired,
                            }).isRequired,
                            arrival: PropTypes.shape({
                                iataCode: PropTypes.string.isRequired,
                                terminal: PropTypes.string,
                                at: PropTypes.string.isRequired,
                            }).isRequired,
                            carrierCode: PropTypes.string.isRequired,
                            number: PropTypes.string.isRequired,
                            aircraft: PropTypes.shape({
                                code: PropTypes.string.isRequired,
                            }).isRequired,
                            operating: PropTypes.shape({
                                carrierCode: PropTypes.string.isRequired,
                            }).isRequired,
                            duration: PropTypes.string.isRequired,
                            id: PropTypes.string.isRequired,
                            numberOfStops: PropTypes.number.isRequired,
                            blacklistedInEU: PropTypes.bool.isRequired,
                        }).isRequired,
                    ).isRequired,
                }).isRequired,
            ).isRequired,
            price: PropTypes.shape({
                currency: PropTypes.string.isRequired,
                total: PropTypes.string.isRequired,
                base: PropTypes.string,
                fees: PropTypes.arrayOf(
                    PropTypes.shape({
                        amount: PropTypes.string,
                        type: PropTypes.string,
                    }),
                ),
                grandTotal: PropTypes.string,
            }).isRequired,
            pricingOptions: PropTypes.shape({
                fareType: PropTypes.arrayOf(PropTypes.string).isRequired,
                includedCheckedBagsOnly: PropTypes.bool.isRequired,
            }).isRequired,
            validatingAirlineCodes: PropTypes.arrayOf(PropTypes.string)
                .isRequired,
            travelerPricings: PropTypes.arrayOf(
                PropTypes.shape({
                    travelerId: PropTypes.string.isRequired,
                    fareOption: PropTypes.string.isRequired,
                    travelerType: PropTypes.string.isRequired,
                    price: PropTypes.shape({
                        currency: PropTypes.string.isRequired,
                        total: PropTypes.string.isRequired,
                        base: PropTypes.string,
                    }).isRequired,
                    fareDetailsBySegment: PropTypes.arrayOf(
                        PropTypes.shape({
                            segmentId: PropTypes.string.isRequired,
                            cabin: PropTypes.string.isRequired,
                            fareBasis: PropTypes.string.isRequired,
                            class: PropTypes.string.isRequired,
                            includedCheckedBags: PropTypes.shape({
                                quantity: PropTypes.number.isRequired,
                            }).isRequired,
                            includedCabinBags: PropTypes.shape({
                                quantity: PropTypes.number.isRequired,
                            }).isRequired,
                            amenities: PropTypes.arrayOf(
                                PropTypes.shape({
                                    description: PropTypes.string.isRequired,
                                    isChargeable: PropTypes.bool.isRequired,
                                    amenityType: PropTypes.string.isRequired,
                                    amenityProvider: PropTypes.shape({
                                        name: PropTypes.string.isRequired,
                                    }).isRequired,
                                }).isRequired,
                            ).isRequired,
                        }).isRequired,
                    ).isRequired,
                }).isRequired,
            ).isRequired,
        }).isRequired,
    ).isRequired,
};

export default SearchResultsPage;
