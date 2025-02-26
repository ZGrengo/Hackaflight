// Importamos PropTypes para validar los tipos de datos de las propiedades
import PropTypes from 'prop-types';

// Este componente recibe un array de búsquedas recientes y las muestra

const RecentSearches = () => {
    return (
        <section >
            <h2 >Últimas Búsquedas realizadas...</h2>
            <div >
                <p >Origen: Madrid</p>
                <p >Destino: Nueva York</p>
                <div >
                    <button >
                        <img src='/public/search.png' alt='buscar' />
                    </button>
                    <button >
                        <img src='/public/fav.png' alt='guardar' />
                    </button>
                </div>
            </div>
        </section>
    );
};

// Validamos las propiedades
RecentSearches.propTypes = {
    recentSearches: PropTypes.arrayOf(
        PropTypes.shape( {
            origen: PropTypes.string.isRequired,
            destino: PropTypes.string.isRequired
        } )
    ).isRequired
};

// Exportamos el componente
export default RecentSearches;