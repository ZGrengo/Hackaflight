import PropTypes from 'prop-types';
import { useState } from 'react';
import aircodes from 'aircodes';

const SearchForm = ({
    tipoViaje,
    fechaSalida,
    fechaRetorno,
    origen,
    destino,
    pasajeros,
    setTipoViaje,
    setFechaSalida,
    setFechaRetorno,
    setOrigen,
    setDestino,
    setPasajeros,
    handleSubmit,
}) => {
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    // Función para buscar aeropuertos con `aircodes`
    const handleSearch = (query, setSuggestions) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const results = aircodes.findAirport(query) || []; // 🔍 Busca aeropuertos por ciudad, país o código IATA

        setSuggestions(results);
    };

    return (
        <section className='relative z-10 top-48 opacity-90 flex justify-center items-center text-sm'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col items-center w-3/4 space-y-4 p-8 bg-dark-blue text-light-blue shadow-lg rounded-lg'
            >
                <section className='grid grid-cols-2 gap-4 w-full'>
                    <section className='flex flex-col items-center'>
                        <label>Pasajeros</label>
                        <input
                            type='number'
                            value={pasajeros}
                            onChange={(e) => setPasajeros(e.target.value)}
                            min='1'
                            className='text-slate-900 w-2/5 h-1/2 border-2 border-medium-blue rounded-md p-2 text-center'
                        />
                    </section>
                    <section className='flex flex-col items-center'>
                        <label>Tipo de Viaje</label>
                        <select
                            value={tipoViaje}
                            onChange={(e) => setTipoViaje(e.target.value)}
                            className='text-slate-900 w-4/5 h-1/2 border-2 border-medium-blue rounded-md'
                        >
                            <option value='ida'>Ida</option>
                            <option value='ida-vuelta'>Ida y Vuelta</option>
                        </select>
                    </section>

                    {/* Origen */}
                    <section className='flex flex-col items-center relative'>
                        <label>Origen</label>
                        <input
                            type='text'
                            placeholder='Ej: Madrid, JFK, LAX'
                            value={origen}
                            onChange={(e) => {
                                setOrigen(e.target.value);
                                handleSearch(e.target.value, setOriginSuggestions);
                            }}
                            className='text-slate-900 w-1/2 text-center border-2 border-medium-blue rounded-md'
                        />
                        {/* 🔹 Lista de sugerencias */}
                        {originSuggestions.length > 0 && (
                            <ul className='absolute top-full bg-white text-black border border-gray-300 w-40 max-h-48 overflow-y-auto rounded-md shadow-md'>
                                {originSuggestions.map((airport) => (
                                    <li
                                        key={airport.iata}
                                        className='p-2 hover:bg-gray-200 cursor-pointer'
                                        onClick={() => {
                                            setOrigen(airport.iata); // Guarda el código IATA
                                            setOriginSuggestions([]); // Oculta las sugerencias
                                        }}
                                    >
                                        {airport.city} - {airport.name} ({airport.iata})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Destino */}
                    <section className='flex flex-col items-center relative'>
                        <label>Destino</label>
                        <input
                            type='text'
                            placeholder='Ej: Barcelona, CDG, MIA'
                            value={destino}
                            onChange={(e) => {
                                setDestino(e.target.value);
                                handleSearch(e.target.value, setDestinationSuggestions);
                            }}
                            className='text-slate-900 w-1/2 text-center border-2 border-medium-blue rounded-md'
                        />
                        {/* 🔹 Lista de sugerencias */}
                        {destinationSuggestions.length > 0 && (
                            <ul className='absolute top-full bg-white text-black border border-gray-300 w-40 max-h-48 overflow-y-auto rounded-md shadow-md'>
                                {destinationSuggestions.map((airport) => (
                                    <li
                                        key={airport.iata}
                                        className='p-2 hover:bg-gray-200 cursor-pointer'
                                        onClick={() => {
                                            setDestino(airport.iata);
                                            setDestinationSuggestions([]);
                                        }}
                                    >
                                        {airport.city} - {airport.name} ({airport.iata})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section className='flex flex-col items-center text-[12px]'>
                        <label>Fecha de Salida</label>
                        <input
                            type='date'
                            value={fechaSalida}
                            onChange={(e) => setFechaSalida(e.target.value)}
                            className='text-slate-900 text-center border-2 border-medium-blue rounded-md'
                        />
                    </section>

                    {tipoViaje === 'ida-vuelta' && (
                        <section className='flex flex-col items-center text-[12px]'>
                            <label>Fecha de Retorno</label>
                            <input
                                type='date'
                                value={fechaRetorno}
                                onChange={(e) => setFechaRetorno(e.target.value)}
                                className='text-slate-900 text-center border-2 border-medium-blue rounded-md'
                            />
                        </section>
                    )}
                </section>

                <button
                    type='submit'
                    className='top-3 relative py-2 px-4 text-slate-900 text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                >
                    Buscar
                </button>
            </form>
        </section>
    );
};

SearchForm.propTypes = {
    tipoViaje: PropTypes.string.isRequired,
    fechaSalida: PropTypes.string.isRequired,
    fechaRetorno: PropTypes.string,
    origen: PropTypes.string.isRequired,
    destino: PropTypes.string.isRequired,
    pasajeros: PropTypes.number.isRequired,
    setTipoViaje: PropTypes.func.isRequired,
    setFechaSalida: PropTypes.func.isRequired,
    setFechaRetorno: PropTypes.func.isRequired,
    setOrigen: PropTypes.func.isRequired,
    setDestino: PropTypes.func.isRequired,
    setPasajeros: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default SearchForm;