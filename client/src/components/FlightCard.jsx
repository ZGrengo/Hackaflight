import PropTypes from 'prop-types';

const FlightCard = ( { flight } ) => {
    const { itineraries, price, travelerPricings } = flight;

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

    return (
        <div className="flight-card max-w-xl w-full mx-auto bg-dark-blue border-solid border-accent-blue border-4 rounded-xl overflow-hidden pb-5">
            <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center">
                <h3 className="text-xl text-light-blue font-bold underline mb-5">Vuelo {flight.id}</h3>
                {itineraries.map( ( itinerary, index ) => {
                    const { segments } = itinerary;
                    const departure = segments[ 0 ].departure;
                    const arrival = segments[ segments.length - 1 ].arrival;
                    const ticketClass = travelerPricings[ 0 ].fareDetailsBySegment[ index ].class;
                    const validatingAirlineCodes = segments.map( ( segment ) => segment.carrierCode ).join( ', ' );

                    return (
                        <div key={index}>
                            <p className="text-gray-300 font-medium">Origen: {departure.iataCode}</p>
                            <p className="text-gray-300 font-medium">Destino: {arrival.iataCode}</p>
                            <p className="text-gray-300 font-medium">Aerolinea: {validatingAirlineCodes}</p>
                            <p className="text-gray-300 font-medium">Fecha de Salida: {departure.at}</p>
                            <p className="text-gray-300 font-medium">Fecha de Llegada: {arrival.at}</p>
                            <p className="text-gray-300 font-medium">Duración: {itinerary.duration}</p>
                            <p className="text-gray-300 font-medium">Escalas: {segments.length - 1}</p>
                            <p className="text-gray-300 font-medium">Tipo de billete: {getTicketClass( ticketClass )}</p>
                        </div>
                    );
                } )}
                <p className="text-gray-300 font-medium">Precio: {price.currency} {price.total}</p>
            </div>
        </div>
    );
};

// Definimos las propiedades que recibe el componente.
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
        } ) ).isRequired
    } ).isRequired
};

export default FlightCard;