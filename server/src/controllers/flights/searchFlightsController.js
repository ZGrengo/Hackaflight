//import formatFlightData from '../../data/formatFlightsData.js';
import amadeus from '../../utils/amadeusClientUtil.js';

// Variable global para almacenar la lista de vuelos
let globalFlights = [];

const searchFlightsController = async ( req, res, next ) => {
    try
    {
        const {
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
        } = req.query;

        if (
            !origin ||
            !destination ||
            !departureDate ||
            !adults
        )
        {
            return res
                .status( 400 )
                .send( { error: 'Faltan parámetros de búsqueda' } );
        }
        const response = await amadeus.shopping.flightOffersSearch.get( {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: adults,
        } );
        let flights = response.data;

        // Almacenar la lista de vuelos en la variable global
        globalFlights = flights;

        console.log( 'flights', globalFlights );
        res.json( flights );
    } catch ( error )
    {
        console.error( 'error detallado', error.response?.result || error );
        res.status( 500 ).send( 'error al buscar vuelos' );
    }
};

export default searchFlightsController;
export { globalFlights };
