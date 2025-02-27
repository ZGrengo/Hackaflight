import PropTypes from 'prop-types';

// Este componente recibe un array de imágenes y las muestra en un carrusel
const CarouselImages = ( { images } ) => {
    return (
        <div className="carousel">
            {images.map( ( image, index ) => (
                <div key={index} className="carousel-item">
                    <img src={image.src} alt={image.alt} />
                </div>
            ) )}
        </div>
    );
};

// Validamos las propiedades
CarouselImages.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape( {
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired
        } )
    ).isRequired
};

// Exportamos el componente
export default CarouselImages;