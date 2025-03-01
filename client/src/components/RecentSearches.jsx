import PropTypes from 'prop-types';

const RecentSearches = ( { recentSearches, onRepeatSearch, onSaveFavorite } ) => {
    return (
        <section>
            <h2>Últimas Búsquedas realizadas...</h2>
            {recentSearches.slice( 0, 5 ).map( ( search, index ) => (
                <div key={index}>
                    <p>Origen: {search.origen}</p>
                    <p>Destino: {search.destino}</p>
                    <div>
                        <button onClick={() => onRepeatSearch( search )}>
                            <img src='/public/search.png' alt='buscar' />
                        </button>
                        <button onClick={() => onSaveFavorite( search )}>
                            <img src='/public/fav.png' alt='guardar' />
                        </button>
                    </div>
                </div>
            ) )}
        </section>
    );
};

RecentSearches.propTypes = {
    recentSearches: PropTypes.arrayOf(
        PropTypes.shape( {
            origen: PropTypes.string.isRequired,
            destino: PropTypes.string.isRequired,
            fechaSalida: PropTypes.string.isRequired,
            fechaRetorno: PropTypes.string,
            pasajeros: PropTypes.number.isRequired,
            tipoViaje: PropTypes.string.isRequired,
        } )
    ).isRequired,
    onRepeatSearch: PropTypes.func.isRequired,
    onSaveFavorite: PropTypes.func.isRequired,
};

export default RecentSearches;