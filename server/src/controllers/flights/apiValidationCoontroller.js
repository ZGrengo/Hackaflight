import validateSearch from '../validators/apiValidator.js';
import generateError from '../utils/generateError.js';
import amadeus from '../../utils/amadeusClientUtil.js';

const apiValidationController = async (req, res, next) => {
    try {
        // Validar los datos solicitados usando Joi
        const { error, value } = validateSearch.validate(req.query);

        if (error) {
            generateError('validacion invalida', 400);
        }

        // Solicitud a la API de Amadeus
        const response = await amadeus.shopping.flight_offers_search.get({
            originLocationCode: value.origin,
            destinationLocationCode: value.destination,
            departureDate: value.departureDate,
            returnDate: value.returnDate, // Este no esta implementado
            adults: value.adults,
        });

        if (!response || !response.data) {
            generateError('No se pudieron obtener vuelos desde Amadeus.', 500);
        }

        const flights = response.data;

        // Enviar la respuesta al cliente
        res.status(200).send({
            status: 'ok',
            data: flights,
            message: 'Lista de vuelos lista',
        });
    } catch (err) {
        next(err);
    }
};

export default apiValidationController;
