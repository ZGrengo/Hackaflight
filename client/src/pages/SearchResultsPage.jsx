import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlightCard from '../components/FlightCard';
import FlightFilters from '../components/FlightFilters';

// obtiene la variable de entorno
const { VITE_API_URL } = import.meta.env;

// definimos la página de resultados de búsqueda
const SearchResultsPage = () => {

    // obtiene la ubicación actual
    const location = useLocation();
    const [ flights, setFlights ] = useState( [] );
    console.log( "Location state:", location.state );


    // actualiza los vuelos cuando cambia la ubicación
    useEffect( () => {
        setFlights( location.state?.flights || [] );
        console.log( "Updated flights from location state:", location.state?.flights || [] );
    }, [ location.state?.flights ] );

    console.log( "Initial flights data:", flights );

    // función para manejar el cambio de filtros
    const handleFilterChange = async ( filters ) => {
        try
        {
            console.log( "Filters applied:", filters );

            // Filtrar los parámetros vacíos
            const searchParams = new URLSearchParams();
            Object.keys( filters ).forEach( key => {
                if ( filters[ key ] )
                {
                    searchParams.append( key, filters[ key ] );
                }
            } );
            console.log( "Filtered parameters:", searchParams.toString() );


            // Realizar la petición a la API para vuelos filtrados
            const res = await fetch(
                `${ VITE_API_URL }/api/flights/filter?${ searchParams.toString() }`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log( 'Response:', res );

            // Manejar la respuesta de la API
            if ( !res.ok ) throw new Error( 'Network response was not ok' );
            const body = await res.json();

            console.log( 'Response body:', body );
            if ( body.status === 'error' ) throw new Error( body.message );

            // Actualizar los vuelos con los datos filtrados
            const filteredFlights = body.data || [];
            setFlights( filteredFlights );

            console.log( 'Filtered flights data:', filteredFlights );
            console.log( 'Updated flights state:', filteredFlights );
        } catch ( err )
        {
            console.log( 'Error al filtrar vuelos:', err );
        }
    };

    // Mostrar un mensaje si no hay vuelos
    if ( !flights.length )
    {
        return <p>No se encontraron resultados de búsqueda.</p>;
    }

    // Renderizar la página de resultados de búsqueda
    return (
        <section>
            <FlightFilters onFilterChange={handleFilterChange} />
            <h2>Resultados de la Búsqueda</h2>
            <section className="flight-cards-container">
                {flights.length > 0 ? (
                    flights.map( ( flight, index ) => (
                        <FlightCard key={`${ flight.id }-${ index }`} flight={flight} />
                    ) )
                ) : (
                    <p>No hay vuelos que coincidan con los filtros.</p>
                )}
            </section>
        </section>
    );
};

SearchResultsPage.propTypes = {
    flights: PropTypes.arrayOf(
        PropTypes.shape( {
            itineraries: PropTypes.arrayOf(
                PropTypes.shape( {
                    duration: PropTypes.string.isRequired,
                    segments: PropTypes.arrayOf(
                        PropTypes.shape( {
                            departure: PropTypes.shape( {
                                iataCode: PropTypes.string.isRequired,
                                terminal: PropTypes.string,
                                at: PropTypes.string.isRequired,
                            } ).isRequired,
                            arrival: PropTypes.shape( {
                                iataCode: PropTypes.string.isRequired,
                                terminal: PropTypes.string,
                                at: PropTypes.string.isRequired,
                            } ).isRequired,
                            carrierCode: PropTypes.string.isRequired,
                            number: PropTypes.string.isRequired,
                            aircraft: PropTypes.shape( {
                                code: PropTypes.string.isRequired,
                            } ).isRequired,
                            operating: PropTypes.shape( {
                                carrierCode: PropTypes.string.isRequired,
                            } ).isRequired,
                            duration: PropTypes.string.isRequired,
                            id: PropTypes.string.isRequired,
                            numberOfStops: PropTypes.number.isRequired,
                            blacklistedInEU: PropTypes.bool.isRequired,
                        } ).isRequired
                    ).isRequired,
                } ).isRequired
            ).isRequired,
            price: PropTypes.shape( {
                currency: PropTypes.string.isRequired,
                total: PropTypes.string.isRequired,
                base: PropTypes.string,
                fees: PropTypes.arrayOf(
                    PropTypes.shape( {
                        amount: PropTypes.string,
                        type: PropTypes.string,
                    } )
                ),
                grandTotal: PropTypes.string,
            } ).isRequired,
            validatingAirlineCodes: PropTypes.arrayOf( PropTypes.string ).isRequired,
            travelerPricings: PropTypes.arrayOf(
                PropTypes.shape( {
                    travelerId: PropTypes.string.isRequired,
                    fareOption: PropTypes.string.isRequired,
                    travelerType: PropTypes.string.isRequired,
                    price: PropTypes.shape( {
                        currency: PropTypes.string.isRequired,
                        total: PropTypes.string.isRequired,
                        base: PropTypes.string,
                    } ).isRequired,
                    fareDetailsBySegment: PropTypes.arrayOf(
                        PropTypes.shape( {
                            segmentId: PropTypes.string.isRequired,
                            cabin: PropTypes.string.isRequired,
                            fareBasis: PropTypes.string.isRequired,
                            class: PropTypes.string.isRequired,
                            includedCheckedBags: PropTypes.shape( {
                                quantity: PropTypes.number.isRequired,
                            } ).isRequired,
                            includedCabinBags: PropTypes.shape( {
                                quantity: PropTypes.number.isRequired,
                            } ).isRequired,
                        } ).isRequired
                    ).isRequired,
                } ).isRequired
            ).isRequired,
        } ).isRequired
    ).isRequired,
};

export default SearchResultsPage;