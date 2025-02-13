import amadeus from '../../utils/amadeusClientUtil.js';

const searchFlightsController = async (req, res) => {
    try {
        const { origin, destination, departureDate } = req.query;

        if (!origin || !destination || !departureDate) {
            return res
                .status(400)
                .send({ error: 'Faltan parámetros de búsqueda' });
        }
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            adults: 1,
        });

        res.json(response.data);
    } catch (error) {
        console.error('error detallado', error.response?.result || error);
        res.status(500).send('error al buscar vuelos');
    }
};

export default searchFlightsController;

// Este controlador recibe los parámetros de búsqueda de vuelos,
// hace la llamada a la API Amadeus para obtener ofertas de vuelos,
// y devuelve la respuesta en formato JSON.
