import PropTypes from 'prop-types';

// Este componente recibe un array de imágenes y las muestra en un carrusel
const CarouselImages = ( { images } ) => {
    return (
        <div className="flex flex-wrap justify-center sm:flex-col">
            {images.map( ( image, index ) => (
                <img key={index} src={image.src} alt={image.alt} className="w-[100px] h-12 rounded-[25%] sm:w-full sm:h-auto" />
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