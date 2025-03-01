import PropTypes from 'prop-types';
import { useState } from 'react';

const FlightFilters = ( { onFilterChange } ) => {
    const [ stops, setStops ] = useState( '' );
    const [ minPrice, setMinPrice ] = useState( '' );
    const [ maxPrice, setMaxPrice ] = useState( '' );
    const [ sortByPrice, setSortByPrice ] = useState( '' );

    const handleFilterChange = () => {
        onFilterChange( {
            stops,
            minPrice,
            maxPrice,
            sortByPrice,
        } );
    };

    return (
        <div>
            <div>
                <label>Paradas:</label>
                <select value={stops} onChange={( e ) => setStops( e.target.value )}>
                    <option value="">Cualquiera</option>
                    <option value="0">Directo</option>
                    <option value="1">1 Parada</option>
                    <option value="2">2 Paradas</option>
                    <option value="3">3 Paradas</option>
                </select>
            </div>
            <div>
                <label>Precio Mínimo:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={( e ) => setMinPrice( e.target.value )}
                />
            </div>
            <div>
                <label>Precio Máximo:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={( e ) => setMaxPrice( e.target.value )}
                />
            </div>
            <div>
                <label>Ordenar por:</label>
                <select value={sortByPrice} onChange={( e ) => setSortByPrice( e.target.value )}>
                    <option value="">Seleccionar</option>
                    <option value="true">Precio Ascendente</option>
                    <option value="false">Precio Descendente</option>
                </select>
            </div>
            <button onClick={handleFilterChange}>Aplicar Filtros</button>
        </div>
    );
};

FlightFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default FlightFilters;