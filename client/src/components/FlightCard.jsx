import PropTypes from 'prop-types';
import { Plane } from 'lucide-react';
import { useMemo } from 'react';

const ticketClassMap = {
    a: 'Primera Clase',
    f: 'Primera Clase',
    p: 'Primera Clase',
    r: 'Primera Clase',
    b: 'Clase Business',
    e: 'Clase Business',
    h: 'Clase Business',
    k: 'Clase Business',
};

const getTicketClass = (ticketClass) => {
    return ticketClassMap[ticketClass.toLowerCase()] || 'Clase Economy';
};

const FlightCard = ({ flight, searchParams }) => {
    const { itineraries, price, travelerPricings, oneWay } = flight;

    const ticketClasses = useMemo(
        () =>
            travelerPricings?.map((pricing) =>
                getTicketClass(pricing.fareDetailsBySegment[0].class),
            ),
        [travelerPricings],
    );

    const formatDate = (date) => date.replace('T', ' ');

    const formatDuration = (duration) => {
        if (typeof duration !== 'string') return 'N/A';
        return duration
            .replace('PT', '')
            .replace('H', ' H ')
            .replace('M', ' Min');
    };

    const getAirlines = (itineraries) => {
        const airlines = new Set();
        itineraries.forEach((itinerary) => {
            itinerary.segments.forEach((segment) =>
                airlines.add(segment.carrierCode),
            );
        });
        return Array.from(airlines).join(', ');
    };

    return (
        <div className='flight-card w-full sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-4/5 p-3'>
            <div className='text-white p-4 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300'>
                <div className='bg-white p-4 rounded-2xl text-blue-900 shadow-md flex flex-col md:flex-row gap-4'>
                    <div className='w-full md:w-1/2'>
                        {itineraries?.map((itinerary, index) => (
                            <div key={index} className='itinerary'>
                                <h3 className='font-bold text-2xl text-dark-blue text-center'>
                                    {index === 0
                                        ? 'Itinerario de Salida'
                                        : 'Itinerario de Vuelta'}
                                </h3>
                                <hr className='my-3 border-blue-300' />
                                <p className='text-center'>
                                    Duración:{' '}
                                    <span className='font-bold text-medium-blue'>
                                        {formatDuration(itinerary.duration)}
                                    </span>
                                </p>
                                {itinerary.segments.map((segment, idx) => (
                                    <div
                                        key={idx}
                                        className='segment bg-gray-100 p-6 rounded-lg mt-3'
                                    >
                                        {segment?.departure &&
                                        segment?.arrival ? (
                                            <div className='flex justify-between items-center'>
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-gray-700 font-medium'>
                                                        Salida
                                                    </p>
                                                    <p className='text-lg font-bold text-medium-blue'>
                                                        {
                                                            segment.departure
                                                                .iataCode
                                                        }
                                                    </p>
                                                    <p className='text-base font-semibold text-gray-800'>
                                                        {formatDate(
                                                            segment.departure
                                                                .at,
                                                        )}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col items-center text-gray-500'>
                                                    <span className='text-2xl'>
                                                        ✈️
                                                    </span>
                                                    <div className='w-0.5 h-12 bg-gray-400 my-2'></div>
                                                </div>
                                                <div className='flex flex-col items-center'>
                                                    <p className='text-gray-700 font-medium'>
                                                        Llegada
                                                    </p>
                                                    <p className='text-lg font-bold text-medium-blue'>
                                                        {
                                                            segment.arrival
                                                                .iataCode
                                                        }
                                                    </p>
                                                    <p className='text-base font-semibold text-gray-800'>
                                                        {formatDate(
                                                            segment.arrival.at,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className='text-center text-red-500'>
                                                Información del segmento no
                                                disponible
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>
                        <h2 className='font-bold text-4xl text-center flex items-center justify-center gap-2'>
                            <Plane className='w-8 h-8 text-dark-blue' /> VUELO{' '}
                            {flight.id}
                        </h2>
                        <p className='text-lg mt-2 text-center'>
                            Precio:{' '}
                            <span className='font-bold text-medium-blue'>
                                {price.total} {price.currency}
                            </span>
                        </p>
                        <div className='traveler-pricings mt-3'>
                            {ticketClasses?.map((ticketClass, index) => (
                                <p
                                    key={index}
                                    className='text-center font-semibold text-gray-800'
                                >
                                    {ticketClass}
                                </p>
                            ))}
                        </div>
                        <p className='mt-3 text-center'>
                            Vuelo:{' '}
                            <span className='font-bold text-medium-blue'>
                                {oneWay || itineraries.length === 1
                                    ? 'Solo ida'
                                    : 'Ida y vuelta'}
                            </span>
                        </p>

                        {searchParams && (
                            <div className='mt-3 text-center'>
                                <p>
                                    De{' '}
                                    <span className='font-bold text-medium-blue'>
                                        {searchParams.origin}
                                    </span>{' '}
                                    a{' '}
                                    <span className='font-bold text-medium-blue'>
                                        {searchParams.destination}
                                    </span>
                                </p>
                                <p>
                                    Volando con{' '}
                                    <span className='font-bold text-medium-blue'>
                                        {getAirlines(itineraries)}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Propiedades del componente
FlightCard.propTypes = {
    flight: PropTypes.shape({
        id: PropTypes.string.isRequired,
        itineraries: PropTypes.arrayOf(
            PropTypes.shape({
                duration: PropTypes.string.isRequired,
                segments: PropTypes.arrayOf(
                    PropTypes.shape({
                        departure: PropTypes.shape({
                            iataCode: PropTypes.string.isRequired,
                            at: PropTypes.string.isRequired,
                        }).isRequired,
                        arrival: PropTypes.shape({
                            iataCode: PropTypes.string.isRequired,
                            at: PropTypes.string.isRequired,
                        }).isRequired,
                    }),
                ).isRequired,
            }),
        ).isRequired,
        price: PropTypes.shape({
            currency: PropTypes.string.isRequired,
            total: PropTypes.string.isRequired,
        }).isRequired,
        travelerPricings: PropTypes.arrayOf(
            PropTypes.shape({
                fareDetailsBySegment: PropTypes.arrayOf(
                    PropTypes.shape({
                        class: PropTypes.string.isRequired,
                    }),
                ).isRequired,
            }),
        ).isRequired,
        oneWay: PropTypes.bool.isRequired,
    }).isRequired,
    searchParams: PropTypes.shape({
        origin: PropTypes.string,
        destination: PropTypes.string,
    }),
};

export default FlightCard;
