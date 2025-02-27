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
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Buscar</button>
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