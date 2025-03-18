import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react'; // Importamos la función findAirline de aircodes

const FlightFilters = ({ onFilterChange, visibleAirlines }) => {
    const [filters, setFilters] = useState({
        stops: '',
        minPrice: '',
        maxPrice: '',
        sortByPrice: '',
        airline: '',
    });

    const [airlineSuggestions, setAirlineSuggestions] = useState([]);
    const suggestionsRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));

        if (name === 'airline' && value) {
            fetchAirlineSuggestions(value);
        } else {
            setAirlineSuggestions([]);
        }
    };

    const fetchAirlineSuggestions = (query) => {
        const filteredSuggestions = visibleAirlines.filter((airline) =>
            airline.toLowerCase().includes(query.toLowerCase())
        );
        setAirlineSuggestions(filteredSuggestions);
    };

    const applyFilters = () => {
        onFilterChange(filters);
    };

    const handleSuggestionClick = (airlineName) => {
        setFilters({ ...filters, airline: airlineName });
        setAirlineSuggestions([]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setAirlineSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <aside className=" bg-white p-10 rounded-lg w-full m-t10">
            <h2 className="text-lg font-semibold text-dark-blue mb-4">Filtrar Resultados</h2>

            <div className="space-y-4">
                {/* Número de paradas */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Escalas</label>
                    <select
                        name="stops"
                        value={filters.stops}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue text-sm"
                    >
                        <option value="">Todas</option>
                        <option value="0">Directo</option>
                        <option value="1">1 Escala</option>
                        <option value="2">2 Escalas</option>
                    </select>
                </div>

                {/* Aerolíneas */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700">Aerolínea</label>
                    <input
                        type="text"
                        name="airline"
                        value={filters.airline}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue text-sm"
                        placeholder="Ej. Iberia, Ryanair"
                    />
                    {airlineSuggestions.length > 0 && (
                        <ul ref={suggestionsRef} className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto z-10">
                            {airlineSuggestions.map((airline, index) => (
                                <li
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
                                    onClick={() => handleSuggestionClick(airline)}
                                >
                                    {airline}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Rango de precios */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Precio Mín</label>
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue text-sm"
                            placeholder="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Precio Máx</label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue text-sm"
                            placeholder="5000"
                        />
                    </div>
                </div>

                {/* Ordenar por precio */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ordenar por</label>
                    <select
                        name="sortByPrice"
                        value={filters.sortByPrice}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue text-sm"
                    >
                        <option value="">Seleccionar</option>
                        <option value="true">Menor a Mayor</option>
                        <option value="false">Mayor a Menor</option>
                    </select>
                </div>

                {/* Botón de aplicar filtros */}
                <div className="text-center">
                    <button
                        onClick={applyFilters}
                        className="py-2 px-4 w-full text-white font-bold bg-medium-blue rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </aside>
    );
};

FlightFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    visibleAirlines: PropTypes.array,
};

export default FlightFilters;
