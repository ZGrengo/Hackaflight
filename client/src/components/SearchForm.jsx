import PropTypes from 'prop-types';

const SearchForm = ( {
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
    handleSubmit
} ) => {
    return (
        <form onSubmit={handleSubmit} className='flex justify-center w-4/5 space-x-4 space-around m-4'>
            <div>
                <label>Tipo de Viaje:</label>
                <select value={tipoViaje} onChange={( e ) => setTipoViaje( e.target.value )}>
                    <option value="ida">Ida</option>
                    <option value="ida-vuelta">Ida y Vuelta</option>
                </select>
            </div>
            <div>
                <label>Fecha de Salida:</label>
                <input
                    type="date"
                    value={fechaSalida}
                    onChange={( e ) => setFechaSalida( e.target.value )}
                />
            </div>
            <div>
                <label>Fecha de Retorno:</label>
                <input
                    type="date"
                    value={fechaRetorno}
                    onChange={( e ) => setFechaRetorno( e.target.value )}
                    disabled={tipoViaje === 'ida'}
                />
            </div>
            <div>
                <label>Origen:</label>
                <input
                    type="text"
                    value={origen}
                    onChange={( e ) => setOrigen( e.target.value )}
                />
            </div>
            <div>
                <label>Destino:</label>
                <input
                    type="text"
                    value={destino}
                    onChange={( e ) => setDestino( e.target.value )}
                />
            </div>
            <div>
                <label>Pasajeros:</label>
                <input
                    type="number"
                    value={pasajeros}
                    onChange={( e ) => setPasajeros( e.target.value )}
                    min="1"
                />
            </div>
            <button type="submit " className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0">Buscar</button>
        </form>
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
    handleSubmit: PropTypes.func.isRequired
};

export default SearchForm;