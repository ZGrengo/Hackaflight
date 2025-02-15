// Importamos las dependencias.
import amadeus from "../../utils/amadeusClientUtil.js";
import generateErrorUtil from "../../utils/generateErrorUtil.js";

// función que obtiene la lista de vuelos.

const flightListController = async (req, res, next) => {
    try {
        const { origin, destination, departureDate, returnDate, adults } = req.query;

        if (!origin || !destination || !departureDate) {
            generateErrorUtil('Faltan campos.', 400);
        }

        const response = await amadeus.shopping.flight_offers_search.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            returnDate,
            adults,
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
