import PropTypes from 'prop-types';

const PopularDestinations = ( { popularDestinations = [] } ) => {
    return (
        <section className="bg-dark-blue my-4 text-center font-light text-light-blue h-80" style={{
            backgroundImage: 'url(./public/ticket.png)', backgroundSize: 'auto', backgroundPosition: 'center'
        }}>
            <h2 className='font-bold italic text-medium-blue text-3xl m-6 pt-5'>Destinos Populares</h2>
            {popularDestinations.length > 0 ? (
                popularDestinations.slice( 0, 5 ).map( ( destination, index ) => (
                    <div key={index} className='m-4 p-4 flex-col bg-light-blue text-dark-blue rounded-lg inline-block'>
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