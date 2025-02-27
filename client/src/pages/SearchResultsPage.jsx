
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
    const location = useLocation();
    const { flights } = location.state || { flights: [] };

    return (
        <div>
            <h2>Resultados de la Búsqueda</h2>
            <table>
                <thead>
                    <tr>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Fecha de Salida</th>
                        <th>Fecha de Retorno</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map( ( flight, index ) => (
                        <tr key={index}>
                            <td>{flight.origen}</td>
                            <td>{flight.destino}</td>
                            <td>{flight.fechaSalida}</td>
                            <td>{flight.fechaRetorno}</td>
                            <td>{flight.precio}</td>
                        </tr>
                    ) )}
                </tbody>
            </table>
        </div>
    );
};

SearchResultsPage.propTypes = {
    flights: PropTypes.arrayOf( PropTypes.shape( {
        origen: PropTypes.string.isRequired,
        destino: PropTypes.string.isRequired,
        fechaSalida: PropTypes.string.isRequired,
        fechaRetorno: PropTypes.string,
        precio: PropTypes.number.isRequired
    } ) )
};

export default SearchResultsPage;
