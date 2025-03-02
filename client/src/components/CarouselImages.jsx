// importamos el hook useEffect y useState de react
import { useEffect, useState } from 'react';

// Este componente recibe un array de imágenes y las muestra en un carrusel
const CarouselImages = () => {
    const [ currentImageIndex, setCurrentImageIndex ] = useState( 0 );

    const images = [
        { src: '/public/imagen 1.jpg', alt: 'img1' },
        { src: '/public/imagen 2.jpg', alt: 'img2' },
        { src: '/public/imagen 3.jpg', alt: 'img3' },
        { src: '/public/imagen 4.jpg', alt: 'img4' },
        { src: '/public/imagen 5.jpg', alt: 'img5' },
        { src: '/public/imagen 6.jpg', alt: 'img6' },
        { src: '/public/imagen 7.jpg', alt: 'img7' },
        { src: '/public/imagen 8.jpg', alt: 'img8' },
        { src: '/public/imagen 9.jpg', alt: 'img9' },
        { src: '/public/imagen 10.jpg', alt: 'img10' },
    ];

    useEffect( () => {
        const interval = setInterval( () => {
            setCurrentImageIndex( ( prevIndex ) => ( prevIndex + 1 ) % images.length );
        }, 2000 );
        return () => clearInterval( interval );
    }, [ images.length ] );

    return (
        <div className="carousel absolute w-full h-full">
            {images.map( ( image, index ) => (
                <div
                    key={index}
                    className={`carousel-item ${ index === currentImageIndex ? 'block' : 'hidden' }`}
                >
                    <img src={image.src} alt={image.alt} className='w-[1900px] h-[1000px] object-cover' />
                </div>
            ) )}
        </div>
    );
};

// Exportamos el componente
export default CarouselImages;