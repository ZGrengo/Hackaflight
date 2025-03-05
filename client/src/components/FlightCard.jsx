import React from 'react';
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
        return duration.replace( 'PT', '' ).replace( 'H', ' H ' ).replace( 'M', ' Min' );
    };

    return (
        <div className="flight-card bg-dark-blue text-white text-center p-3 mb-3">
            <h2>Vuelo {flight.id}</h2>
            <p>Precio: {price.total} {price.currency}</p>
            <p>Tipo de vuelo: {oneWay ? 'Solo ida' : 'Ida y vuelta'}</p>
            {itineraries.map( ( itinerary, index ) => (
                <div key={index} className="itinerary">
                    <h3>Itinerario {index + 1}</h3>
                    <p>Duración: {formatDuration( itinerary.duration )}</p>
                    {itinerary.segments.map( ( segment, idx ) => (
                        <div key={idx} className="segment">
                            <p>Salida: {segment.departure.iataCode} a las {formatDate( segment.departure.at )}</p>
                            <p>Llegada: {segment.arrival.iataCode} a las {formatDate( segment.arrival.at )}</p>
                        </div>
                    ) )}
                </div>
            ) )}
            <div className="traveler-pricings">
                {travelerPricings.map( ( pricing, index ) => (
                    <div key={index} className="pricing">
                        <p>Clase: {getTicketClass( pricing.fareDetailsBySegment[ 0 ].class )}</p>
                    </div>
                ) )}
            </div>
        </div>
    );
};

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