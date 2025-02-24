//import formatFlightData from '../../data/formatFlightsData.js';
import amadeus from '../../utils/amadeusClientUtil.js';

// Variable global para almacenar la lista de vuelos
let globalFlights = [];

const searchFlightsController = async (req, res, next) => {
    try {
        const {
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
            minPrice,
            maxPrice,
        } = req.query;

        if (
            !origin ||
            !destination ||
            !departureDate ||
            !returnDate ||
            !adults
        ) {
            return res
                .status(400)
                .send({ error: 'Faltan parámetros de búsqueda' });
        }
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: adults,
        });
        let flights = response.data;
        // let flights = formatFlightData(response.data); para formatear la respuesta de amadeus

        // Filtrado de vuelos por precio
        if (minPrice || maxPrice) {
            flights = flights.filter((flight) => {
                const price = parseFloat(flight.price.total);
                if (minPrice && price < parseFloat(minPrice)) {
                    return false;
                }
                if (maxPrice && price > parseFloat(maxPrice)) {
                    return false;
                }
                return true;
            });
        }
        // Almacenar la lista de vuelos en la variable global
        globalFlights = flights;

        res.json(flights);
    } catch (error) {
        console.error('error detallado', error.response?.result || error);
        res.status(500).send('error al buscar vuelos');
    }
};

export default searchFlightsController;
export { globalFlights };
