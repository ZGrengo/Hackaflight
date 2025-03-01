import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlightCard from '../components/FlightCard';
import FlightFilters from '../components/FlightFilters';

const { VITE_API_URL } = import.meta.env;

const SearchResultsPage = () => {
    const location = useLocation();
    const { flights = { ida: [], vuelta: [] } } = location.state || {};
    const [ filteredFlights, setFilteredFlights ] = useState( [ ...flights.ida, ...flights.vuelta ] );

    const handleFilterChange = async ( filters ) => {
        const searchParams = new URLSearchParams();

        // Añadir solo los filtros que tienen valores
        Object.keys( filters ).forEach( ( key ) => {
            if ( filters[ key ] )
            {
                searchParams.append( key, filters[ key ] );
            }
        } );

        try
        {
            const res = await fetch(
                `${ VITE_API_URL }/api/flights/filter?${ searchParams.toString() }`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if ( !res.ok ) throw new Error( 'Network response was not ok' );
            const body = await res.json();

            if ( body.status === 'error' ) throw new Error( body.message );
            setFilteredFlights( body.data || [] );
        } catch ( err )
        {
            console.log( 'Error al filtrar vuelos:', err );
        }
    };


    useEffect( () => {
        setFilteredFlights( [ ...flights.ida, ...flights.vuelta ] );
    }, [ flights ] );
    console.log( flights.ida, flights.vuelta );

    if ( !flights.ida.length && !flights.vuelta.length )
    {

        return <p>No se encontraron resultados de búsqueda.</p>;
    } else
    {
        return (
            <div>
                <FlightFilters onFilterChange={handleFilterChange} />
                <h2>Resultados de la Búsqueda</h2>
                <div className="flight-cards-container">
                    {filteredFlights.map( ( flight, index ) => (
                        <FlightCard key={index} flight={flight} />
                    ) )}
                </div>
            </div>
        );
    }
};

SearchResultsPage.propTypes = {
    flights: PropTypes.shape( {
        ida: PropTypes.arrayOf(
            PropTypes.shape( {
                origin: PropTypes.string.isRequired,
                destination: PropTypes.string.isRequired,
                departureDate: PropTypes.string.isRequired,
                returnDate: PropTypes.string,
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
                stops: PropTypes.number,
            } )
        ),
        vuelta: PropTypes.arrayOf(
            PropTypes.shape( {
                origin: PropTypes.string.isRequired,
                destination: PropTypes.string.isRequired,
                departureDate: PropTypes.string.isRequired,
                returnDate: PropTypes.string,
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
                stops: PropTypes.number,
            } )
        ),
    } ),
};

export default SearchResultsPage;