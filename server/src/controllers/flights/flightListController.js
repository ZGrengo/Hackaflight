import generateErrorUtil from '../../utils/generateErrorUtil.js';
import { globalFlights } from './searchFlightsController.js';

// Controlador para filtrar la lista de vuelos almacenada
const filterFlightListController = ( req, res, next ) => {
    try
    {
        // Validar que haya vuelos almacenados
        if ( !globalFlights || globalFlights.length === 0 )
        {
            throw generateErrorUtil(
                'No hay vuelos disponibles para filtrar. Realiza una búsqueda primero.',
                404,
            );
        }

        // Obtener los parámetros de filtrado del query
        const {
            airline,
            minPrice,
            maxPrice,
            departureTime,
            arrivalTime,
            class: travelClass,
            stops,
            sortByPrice,
            sortBy, // Parámetro de ordenación
            order = 'asc', // Orden por defecto: ascendente
        } = req.query;

        // Validar que no se filtren ambas horas al mismo tiempo
        if ( departureTime && arrivalTime )
        {
            throw generateErrorUtil(
                'No se puede filtrar por "departureTime" y "arrivalTime" al mismo tiempo.',
                400,
            );
        }

        // Aplicar los filtros
        let filteredFlights = [ ...globalFlights ];

        // Filtro por aerolínea
        if ( airline )
        {
            const airlineUpper = airline.toUpperCase();
            const airlineExists = filteredFlights.some( ( flight ) =>
                flight.validatingAirlineCodes?.includes( airlineUpper ),
            );
            if ( !airlineExists )
            {
                throw generateErrorUtil(
                    `La aerolínea "${ airline }" no se encuentra en los resultados de búsqueda.`,
                    400,
                );
            }
            filteredFlights = filteredFlights.filter( ( flight ) =>
                flight.validatingAirlineCodes?.includes( airlineUpper ),
            );
        }

        // Filtro por precio mínimo
        if ( minPrice )
        {
            const parsedMinPrice = parseFloat( minPrice );
            if ( isNaN( parsedMinPrice ) )
            {
                throw generateErrorUtil(
                    'El parámetro "minPrice" debe ser un número válido.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter(
                ( flight ) => parseFloat( flight.price?.total ) >= parsedMinPrice,
            );
        }

        // Filtro por precio máximo
        if ( maxPrice )
        {
            const parsedMaxPrice = parseFloat( maxPrice );
            if ( isNaN( parsedMaxPrice ) )
            {
                throw generateErrorUtil(
                    'El parámetro "maxPrice" debe ser un número válido.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter(
                ( flight ) => parseFloat( flight.price?.total ) <= parsedMaxPrice,
            );
        }

        // Filtro por horario de salida
        if ( departureTime )
        {
            const departureHour = parseInt( departureTime.split( ':' )[ 0 ], 10 );
            if ( isNaN( departureHour ) )
            {
                throw generateErrorUtil(
                    'El parámetro "departureTime" debe ser una hora válida en formato HH:MM.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter( ( flight ) => {
                const flightHour = new Date( flight.itineraries[ 0 ]?.segments[ 0 ]?.departure?.at )
                    .getUTCHours();
                return flightHour === departureHour;
            } );
        }

        // Filtro por horario de llegada
        if ( arrivalTime )
        {
            const arrivalHour = parseInt( arrivalTime.split( ':' )[ 0 ], 10 );
            if ( isNaN( arrivalHour ) )
            {
                throw generateErrorUtil(
                    'El parámetro "arrivalTime" debe ser una hora válida en formato HH:MM.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter( ( flight ) => {
                const lastSegment = flight.itineraries[ 0 ]?.segments[ flight.itineraries[ 0 ]?.segments.length - 1 ];
                const flightHour = new Date( lastSegment?.arrival?.at )
                    .getUTCHours();
                return flightHour === arrivalHour;
            } );
        }

        // Filtro por clase de billete
        if ( travelClass )
        {
            const validClasses = [ 'a', 'f', 'p', 'r', 'c', 'd', 'i', 'j', 'z' ];
            if ( !validClasses.includes( travelClass.toLowerCase() ) )
            {
                throw generateErrorUtil(
                    'El parámetro "class" debe ser una de las siguientes clases: a, f, p, r, c, d, i, j, z.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter( ( flight ) =>
                flight.travelerPricings?.some(
                    ( pricing ) => pricing.fareDetailsBySegment?.some(
                        ( fareDetail ) => fareDetail.class === travelClass.toUpperCase()
                    )
                ),
            );
        }

        // Filtro por cantidad de escalas
        if ( stops )
        {
            const parsedStops = parseInt( stops );
            if ( isNaN( parsedStops ) )
            {
                throw generateErrorUtil(
                    'El parámetro "stops" debe ser un número válido.',
                    400,
                );
            }
            const stopsExist = filteredFlights.some( ( flight ) =>
                flight.itineraries[ 0 ]?.segments.length - 1 === parsedStops,
            );
            if ( !stopsExist )
            {
                throw generateErrorUtil(
                    `No hay vuelos con ${ parsedStops } escalas en los resultados de búsqueda.`,
                    400,
                );
            }
            filteredFlights = filteredFlights.filter( ( flight ) =>
                flight.itineraries[ 0 ]?.segments.length - 1 === parsedStops,
            );
        }

        // Ordenar por precio
        if ( sortByPrice )
        {
            const sortAscending = sortByPrice.toLowerCase() === 'true';
            filteredFlights = filteredFlights.sort( ( a, b ) => {
                const priceA = parseFloat( a.price?.total );
                const priceB = parseFloat( b.price?.total );
                return sortAscending ? priceA - priceB : priceB - priceA;
            } );
        }

        // Ordenar por precio, paradas o duración
        if ( sortBy )
        {
            filteredFlights = filteredFlights.sort( ( a, b ) => {
                let valueA, valueB;

                switch ( sortBy )
                {
                    case 'price':
                        valueA = parseFloat( a.price?.total );
                        valueB = parseFloat( b.price?.total );
                        break;
                    case 'stops':
                        valueA = a.itineraries[ 0 ]?.segments.length;
                        valueB = b.itineraries[ 0 ]?.segments.length;
                        break;
                    case 'duration':
                        valueA = a.itineraries[ 0 ]?.duration;
                        valueB = b.itineraries[ 0 ]?.duration;
                        break;
                    default:
                        return 0;
                }

                if ( order === 'desc' )
                {
                    return valueB - valueA;
                }
                return valueA - valueB; // Orden ascendente por defecto
            } );
        }

        // Enviar la respuesta con los vuelos filtrados
        res.status( 200 ).send( {
            status: 'ok',
            data: filteredFlights,
            message: 'Lista de vuelos filtrada con éxito',
        } );
    } catch ( err )
    {
        next( err );
    }
};

export { filterFlightListController };