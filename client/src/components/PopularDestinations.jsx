import { useState, useEffect } from 'react';

const PopularDestinations = () => {
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
        <section className='my-8 px-0,4'>
            <h2 className='text-3xl font-light text-center text-dark-blue font-heading mb-6'>
                DESTINOS POPULARES
            </h2>
<div className='relative w-full h-[400px] overflow-hidden shadow-lg rounded-lg'>
    {images.map((img, index) => (
        <img
            key={img}
            src={img}
            alt='Destino'
            className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000
                        ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
        />
    ))}
</div>
        </section>
    );
};

export default PopularDestinations;
