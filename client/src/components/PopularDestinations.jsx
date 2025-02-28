import PropTypes from 'prop-types';

const PopularDestinations = ( { popularDestinations = [] } ) => {
    return (
        <section>
            <h2>Destinos Populares</h2>
            {popularDestinations.length > 0 ? (
                popularDestinations.slice( 0, 5 ).map( ( destination, index ) => (
                    <div key={index}>
                        <p>Origen: {destination.origen}</p>
                        <p>Destino: {destination.destino}</p>
                    </div>
                ) )
            ) : (
                <p>Ejemplo: Madrid - Nueva York, Londres - Tokio, Paris - Londres</p>
            )}
        </section>
    );
};

PopularDestinations.propTypes = {
    popularDestinations: PropTypes.arrayOf(
        PropTypes.shape( {
            origen: PropTypes.string.isRequired,
            destino: PropTypes.string.isRequired,
        } )
    ),
};

export default PopularDestinations;