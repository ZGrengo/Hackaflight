import { useState, useEffect } from 'react';

const SlideshowCircle = () => {
    const images = [
        '/public/imagen1.jpg',
        '/public/imagen2.jpg',
        '/public/imagen3.jpg',
        '/public/imagen4.jpg',
        '/public/imagen5.jpg',
        '/public/imagen6.jpg',
        '/public/imagen7.jpg',
        '/public/imagen8.jpg',
        '/public/imagen9.jpg',
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 7000); // tiempo que dura cada imagen 7 segundos
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className='hidden md:block absolute left-8 top-1/2 transform -translate-y-1/2 z-10'>
            <div className='w-96 h-96 rounded-full overflow-hidden relative shadow-2x1'>
                {images.map((img, index) => (
                    <img
                        key={img}
                        src={img}
                        alt='Destino'
                        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-2000
                                ${
                                    index === currentImage
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                }`}
                    />
                ))}
            </div>
        </div>
    );
};
export default SlideshowCircle;
