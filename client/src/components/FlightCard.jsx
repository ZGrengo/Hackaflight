import PropTypes from 'prop-types';

// Componente que muestra la información de un vuelo
const FlightCard = ( { flight, searchParams } ) => {
    const { itineraries, price, travelerPricings, oneWay } = flight;

    // Función que devuelve el tipo de clase de un billete
    const getTicketClass = ( ticketClass ) => {
        if ( [ 'a', 'f', 'p', 'r' ].includes( ticketClass.toLowerCase() ) )
        {
            return 'Primera Clase';
        } else if ( [ 'b', 'e', 'h', 'k' ].includes( ticketClass.toLowerCase() ) )
        {
            return 'Clase Business';
        } else
        {
            return 'Clase Economy';
        }
    };

    // Función que formatea una fecha
    const formatDate = ( date ) => {
        return date.replace( 'T', ' ' );
    };

    // Función que formatea la duración de un vuelo
    const formatDuration = ( duration ) => {
        if ( typeof duration !== 'string' )
        {
            return 'N/A';
        }
        return duration.replace( 'PT', '' ).replace( 'H', ' H ' ).replace( 'M', ' Min' );
    };

    // Obtener las aerolíneas de los vuelos
    const getAirlines = ( itineraries ) => {
        const airlines = new Set();
        itineraries.forEach( itinerary => {
            itinerary.segments.forEach( segment => {
                airlines.add( segment.carrierCode );
            } );
        } );
        return Array.from( airlines ).join( ', ' );
    };

    // Renderizado del componente
    return (
        <div className="flight-card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="bg-dark-blue text-center p-3 mb-3 rounded-lg font-bold transform hover:scale-110 transition duration-500">
                <div className="bg-medium-blue p-3 rounded-lg text-dark-blue">
                    <h2 className="font-bold text-4xl underline text-cyan-200">VUELO {flight.id}</h2>
                    <br />
                    <p>Precio <span className="font-bold underline text-cyan-200">{price.total} {price.currency}</span></p>
                    <div className="traveler-pricings">
                        {travelerPricings && travelerPricings.map( ( pricing, index ) => (
                            <div key={index} className="pricing">
                                <p className='text-cyan-200'>{getTicketClass( pricing.fareDetailsBySegment[ 0 ].class )}</p>
                            </div>
                        ) )}
                    </div>
                    <p className="mb-2">Vuelo <span className="font-bold  text-cyan-200">{oneWay ? 'Solo ida' : 'Ida y vuelta'}</span></p>
                    <p>De <span className="font-bold text-cyan-200">{searchParams.origin}</span> a <span className="font-bold text-cyan-200">{searchParams.destination}</span></p>
                    <p>Volando con <span className="font-bold text-cyan-200"> {getAirlines( itineraries )}</span> .</p>
                </div>
                <br />
                <div className="bg-medium-blue p-3 rounded-lg text-dark-blue">
                    {itineraries && itineraries.map( ( itinerary, index ) => (
                        <div key={index} className="itinerary">
                            <h3 className="font-bold text-2xl text-cyan-200">{index === 0 ? 'Itinerario de Salida' : 'Itinerario de Vuelta'}</h3>
                            <hr className='my-2 ' />
                            <p>Duración <span className="font-bold underline text-cyan-200">{formatDuration( itinerary.duration )}</span></p>
                            {itinerary.segments.map( ( segment, idx ) => (
                                <div key={idx} className="segment">
                                    {segment && segment.departure && segment.arrival ? (
                                        <section className="my-2">
                                            <p>Salida <span className="font-bold underline text-cyan-200">{segment.departure.iataCode}</span> a las {formatDate( segment.departure.at )}</p>
                                            <p>Llegada <span className="font-bold underline text-cyan-200">{segment.arrival.iataCode}</span> a las {formatDate( segment.arrival.at )}</p>
                                        </section>
                                    ) : (
                                        <p>Información del segmento no disponible</p>
                                    )}
                                </div>
                            ) )}
                        </div>
                    ) )}
                </div>
            </div>
        </div>
    );
};

// Propiedades del componente
FlightCard.propTypes = {
    flight: PropTypes.shape( {
        id: PropTypes.string.isRequired,
        itineraries: PropTypes.arrayOf( PropTypes.shape( {
            duration: PropTypes.string.isRequired,
            segments: PropTypes.arrayOf( PropTypes.shape( {
                departure: PropTypes.shape( {
                    iataCode: PropTypes.string.isRequired,
                    at: PropTypes.string.isRequired
                } ).isRequired,
                arrival: PropTypes.shape( {
                    iataCode: PropTypes.string.isRequired,
                    at: PropTypes.string.isRequired
                } ).isRequired
            } ) ).isRequired
        } ) ).isRequired,
        price: PropTypes.shape( {
            currency: PropTypes.string.isRequired,
            total: PropTypes.string.isRequired
        } ).isRequired,
        travelerPricings: PropTypes.arrayOf( PropTypes.shape( {
            fareDetailsBySegment: PropTypes.arrayOf( PropTypes.shape( {
                class: PropTypes.string.isRequired
            } ) ).isRequired
        } ) ).isRequired,
        oneWay: PropTypes.bool.isRequired
    } ).isRequired,
    searchParams: PropTypes.shape( {
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
    } ).isRequired,
};

export default FlightCard;