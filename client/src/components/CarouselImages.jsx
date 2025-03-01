import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Este componente recibe un array de imágenes y las muestra en un carrusel
const CarouselImages = ( { images } ) => {
    const [ currentImageIndex, setCurrentImageIndex ] = useState( 0 );

    useEffect( () => {
        const interval = setInterval( () => {
            setCurrentImageIndex( ( prevIndex ) => ( prevIndex + 1 ) % images.length );
        }, 2000 );
        return () => clearInterval( interval );
    }, [ images.length ] );

    return (
        <div className="carousel absolute inset-0 z-0 bg-medium-blue">
            {images.map( ( image, index ) => (
                <div
                    key={index}
                    className={`carousel-item ${ index === currentImageIndex ? 'block' : 'hidden' }`}
                >
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
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