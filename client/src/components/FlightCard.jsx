import PropTypes from 'prop-types';

const FlightCard = ( { flight } ) => {
    const { itineraries, price, travelerPricings } = flight;
    const { segments } = itineraries[ 0 ];
    const departure = segments[ 0 ].departure;
    const arrival = segments[ segments.length - 1 ].arrival;
    const ticketClass = travelerPricings[ 0 ].fareDetailsBySegment[ 0 ].class;

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

    // Retorna la estructura HTML del componente FlightCard
    return (
        <div className="flight-card">
            <h3>Vuelo {flight.id}</h3>
            <p>Origen: {departure.iataCode}</p>
            <p>Destino: {arrival.iataCode}</p>
            <p>Fecha de Salida: {departure.at}</p>
            <p>Fecha de Llegada: {arrival.at}</p>
            <p>Duración: {itineraries[ 0 ].duration}</p>
            <p>Escalas: {segments.length - 1}</p>
            <p>Tipo de billete: {getTicketClass( ticketClass )}</p>
            <p>Precio: {price.currency} {price.total}</p>
        </div>
    );
};
// falta meter la aerolinea

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