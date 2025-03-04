import PropTypes from 'prop-types';

const FlightCard = ( { flight } ) => {
    const { itineraries, price, travelerPricings, oneWay } = flight;

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

    const formatDate = ( date ) => {
        return date.replace( 'T', ' ' );
    };

    const formatDuration = ( duration ) => {
        return duration.replace( 'PT', '' ).replace( 'H', 'H ' ).replace( 'M', 'Min' );
    };

    return (
        <div className="flight-card max-w-xl w-full mx-auto bg-dark-blue border-solid border-accent-blue border-4 rounded-xl overflow-hidden shadow-lg my-5">
            <div className="max-w-md mx-auto pt-12 pb-14 px-5 text-center ">
                <h3 className="text-2xl text-light-blue font-bold underline mb-5">Vuelo {flight.id}</h3>
                {itineraries.length > 0 && (
                    <div>
                        <div>
                            <p className="text-gray-300 font-medium text-xl">Escalas: {itineraries[ 0 ].segments.length - 1}</p>
                            <p className="text-gray-300 font-medium text-xl">Origen: {itineraries[ 0 ].segments[ 0 ].departure.iataCode}</p>
                            <p className="text-gray-300 font-medium text-xl">Destino: {itineraries[ 0 ].segments[ itineraries[ 0 ].segments.length - 1 ].arrival.iataCode}</p>
                            <p className="text-gray-300 font-medium text-xl">Aerolinea: {itineraries[ 0 ].segments.map( ( seg ) => seg.carrierCode ).join( ', ' )}</p>
                            <br></br>

                            <p className="text-gray-300 font-medium text-xl">Fecha de Salida: {formatDate( itineraries[ 0 ].segments[ 0 ].departure.at )}</p>
                            <p className="text-gray-300 font-medium text-xl">Duración de Ida: {formatDuration( itineraries[ 0 ].duration )}</p>
                            <br></br>
                            {itineraries.length > 1 && (
                                <>
                                    <p className="text-gray-300 font-medium text-xl">Fecha de Regreso: {formatDate( itineraries[ 1 ].segments[ itineraries[ 1 ].segments.length - 1 ].arrival.at )}</p>
                                    <p className="text-gray-300 font-medium text-xl">Duración de Regreso: {formatDuration( itineraries[ 1 ].duration )}</p>
                                </>
                            )}
                            <br></br>
                            <p className="text-gray-300 font-medium text-xl">Tipo de billete: {getTicketClass( travelerPricings[ 0 ].fareDetailsBySegment[ 0 ].class )}</p>
                        </div>
                        {itineraries[ 0 ].segments.length > 1 && (
                            <div>
                                <hr className="my-4 border-gray-500" />
                                <hr className="my-4 border-gray-500" />

                                <h4 className="text-xl text-light-blue font-bold mb-5">Vuelo de Salida</h4>
                                <hr className="my-4 border-gray-500" />

                                {itineraries[ 0 ].segments.map( ( segment, segmentIndex ) => (
                                    <div key={segmentIndex}>
                                        <p className="text-gray-300 font-medium">Origen: {segment.departure.iataCode}</p>
                                        <p className="text-gray-300 font-medium">Destino: {segment.arrival.iataCode}</p>
                                        <p className="text-gray-300 font-medium">Aerolinea: {segment.carrierCode}</p>
                                        <p className="text-gray-300 font-medium">Fecha de Salida: {formatDate( segment.departure.at )}</p>
                                        <p className="text-gray-300 font-medium">Fecha de Llegada: {formatDate( segment.arrival.at )}</p>
                                        <p className="text-gray-300 font-medium">Duración: {formatDuration( segment.duration )}</p>
                                        <hr className="my-4 border-gray-500" />
                                    </div>
                                ) )}
                            </div>
                        )}
                    </div>
                )}
                {!oneWay && itineraries.length > 1 && (
                    <>
                        <hr className="my-4 border-gray-500" />
                        <h4 className="text-xl text-light-blue font-bold mb-5">Vuelo de Regreso</h4>
                        <hr className="my-4 border-gray-500" />

                        <div>
                            {itineraries[ 1 ].segments.map( ( segment, segmentIndex ) => {
                                const departure = segment.departure;
                                const arrival = segment.arrival;
                                const validatingAirlineCodes = itineraries[ 1 ].segments.map( ( seg ) => seg.carrierCode ).join( ', ' );

                                return (
                                    <div key={segmentIndex}>
                                        <p className="text-gray-300 font-medium">Origen: {departure.iataCode}</p>
                                        <p className="text-gray-300 font-medium">Destino: {arrival.iataCode}</p>
                                        <p className="text-gray-300 font-medium">Aerolinea: {validatingAirlineCodes}</p>
                                        <p className="text-gray-300 font-medium">Fecha de Salida: {formatDate( departure.at )}</p>
                                        <p className="text-gray-300 font-medium">Fecha de Llegada: {formatDate( arrival.at )}</p>
                                        <p className="text-gray-300 font-medium">Duración: {formatDuration( segment.duration )}</p>
                                        <hr className="my-4 border-gray-500" />
                                    </div>
                                );
                            } )}
                        </div>
                    </>
                )}
                <hr className="my-4 border-gray-500" />
                <h4 className="text-xl text-light-blue font-bold  mb-3">Precio</h4>
                <p className="text-gray-300 font-bold text-xl">Precio: € {price.total}</p>
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
        } ) ).isRequired,
        oneWay: PropTypes.bool.isRequired
    } ).isRequired
};

export default FlightCard;