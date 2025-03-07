import PropTypes from 'prop-types';

// Componente que muestra la información de un vuelo
const FlightCard = ( { flight } ) => {
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

    // Renderizado del componente
    return (
        <div className="flight-card bg-dark-blue text-white text-center p-3 mb-3 rounded-xl shadow-lg">
            <h2 className="font-semibold underline text-xl">Vuelo {flight.id}</h2>
            <p>Precio {price.total} {price.currency}</p>
            <div className="traveler-pricings">
                {travelerPricings && travelerPricings.map( ( pricing, index ) => (
                    <div key={index} className="pricing">
                        <p>Clase {getTicketClass( pricing.fareDetailsBySegment[ 0 ].class )}</p>
                    </div>
                ) )}
            </div>
            <p className="mb-2">Vuelo de {oneWay ? 'Solo ida' : 'Ida y vuelta'}</p>
            <hr />
            {itineraries && itineraries.map( ( itinerary, index ) => (
                <div key={index} className="itinerary">
                    <h3 className="font-medium text-lg">Itinerario {index + 1}</h3>
                    <hr />
                    <p>Duración {formatDuration( itinerary.duration )}</p>
                    {itinerary.segments.map( ( segment, idx ) => (
                        <div key={idx} className="segment">
                            {segment && segment.departure && segment.arrival ? (
                                <section className="my-2">
                                    <p>Salida {segment.departure.iataCode} a las {formatDate( segment.departure.at )}</p>
                                    <p>Llegada {segment.arrival.iataCode} a las {formatDate( segment.arrival.at )}</p>
                                    <hr />
                                </section>
                            ) : (
                                <p>Información del segmento no disponible</p>
                            )}
                        </div>
                    ) )}
                </div>
            ) )}
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
    } ).isRequired
};

export default FlightCard;