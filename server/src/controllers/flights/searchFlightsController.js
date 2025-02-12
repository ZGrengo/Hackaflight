import amadeus from '../../utils/amadeusClient.js';

const searchFlightsController = async (req, res, next) => {
    try {
        const { origin, destination, departureDate, returnDate, adults } =
            req.query;

        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            returnDate,
            adults,
        });

        res.status(200).json(response.data);
    } catch (error) {
        next(error);
    }
};

export default searchFlightsController;

// Este controlador recibe los parámetros de búsqueda de vuelos,
// hace la llamada a la API Amadeus para obtener ofertas de vuelos,
// y devuelve la respuesta en formato JSON.
