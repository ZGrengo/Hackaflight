const formatFlightData = (flights) => {
    return flights.map((flight) => ({
        price: flight.price.total,
        origin: flight.itineraries[0].segments[0].departure.iataCode,
        destination:
            flight.itineraries[0].segments[
                flight.itineraries[0].segments.length - 1
            ].arrival.iataCode,
        departureDate: flight.itineraries[0].segments[0].departure.at,
        returnDate: flight.itineraries[1]?.segments[0].departure.at,
        stops: flight.itineraries[0].segments.length - 1,
        duration: flight.itineraries[0].duration,
        airline: flight.validatingAirlineCodes[0],
        numberOfPassengers: flight.travelerPricings.length,
        travelClass: {
            cabin:
                flight.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin ||
                'ECONOMY',
            price: flight.price.total,
        },
    }));
};

export default formatFlightData;
