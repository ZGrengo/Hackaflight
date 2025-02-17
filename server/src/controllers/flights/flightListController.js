// Importamos las dependencias.
import amadeus from '../../utils/amadeusClientUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import validateSearch from '../../validators/apiValidation.js';

// función que obtiene la lista de vuelos.

const flightListController = async (req, res, next) => {
    /* (Endpoint sin JOI) try {
        const { origin, destination, departureDate, returnDate, adults } =
            req.query;

        if (!origin || !destination || !departureDate) {
            generateErrorUtil('Faltan campos.', 400);
        }*/

    // Extra validacion joi

    try {
        // Validar los datos solicitados usando Joi
        const { error, value } = validateSearch.validate(req.query);

        if (error) {
            generateErrorUtil('validacion invalida', 400);
        }

        // Solicitud a la API de Amadeus
        const response = await amadeus.shopping.flight_offers_search.get({
            originLocationCode: value.origin,
            destinationLocationCode: value.destination,
            departureDate: value.departureDate,
            returnDate: value.returnDate, // Este no esta implementado
            adults: value.adults,
        });

        const flights = response.data;

        res.status(200).send({
            status: 'ok',
            data: flights,
            message: 'Lista de vuelos obtenida con éxito',
        });
    } catch (err) {
        next(err);
    }
};

export default flightListController;
