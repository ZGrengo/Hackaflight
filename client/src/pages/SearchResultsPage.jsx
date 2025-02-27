import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import FlightCard from '../components/FlightCard';

const SearchResultsPage = () => {
    const location = useLocation();
    console.log( 'Location:', location );
    const { flights } = location.state || {};

    console.log( 'Flights:', flights );

    if ( !flights || flights.length === 0 )
    {
        return <p>No se encontraron resultados de búsqueda.</p>;
    } else
    {
        return (
            <div>
                <h2>Resultados de la Búsqueda</h2>
                <div className="flight-cards-container">
                    {flights.map( ( flight, index ) => (
                        <FlightCard key={index} flight={flight} />
                    ) )}
                </div>
            </div>
        );
    }
};

SearchResultsPage.propTypes = {
    flights: PropTypes.arrayOf( PropTypes.shape( {
        origin: PropTypes.string.isRequired,
        destination: PropTypes.string.isRequired,
        departureDate: PropTypes.string.isRequired,
        returnDate: PropTypes.string,
        price: PropTypes.shape( {
            currency: PropTypes.string.isRequired,
            total: PropTypes.string.isRequired,
            base: PropTypes.string,
            fees: PropTypes.arrayOf( PropTypes.shape( {
                amount: PropTypes.string,
                type: PropTypes.string
            } ) ),
            grandTotal: PropTypes.string
        } ).isRequired
    } ) )
};

export default SearchResultsPage;