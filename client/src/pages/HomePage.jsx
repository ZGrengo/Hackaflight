import { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import CarouselImages from '../components/CarouselImages';
import RecentSearches from '../components/RecentSearches';
import PopularDestinations from '../components/PopularDestinations';
import RatingsSummary from '../components/RatingSumary';
import Header from '../components/Header';
import LogoAnimation from '../components/LogoAnimation';
import PaperPlaneAnimation from '../components/PaperPlaneAnimation';

const HomePage = () => {
    const [ tipoViaje, setTipoViaje ] = useState( 'ida' );
    const [ fechaSalida, setFechaSalida ] = useState( '' );
    const [ fechaLlegada, setFechaLlegada ] = useState( '' );
    const [ origen, setOrigen ] = useState( '' );
    const [ destino, setDestino ] = useState( '' );
    const [ pasajeros, setPasajeros ] = useState( 1 );
    const [ claseBillete, setClaseBillete ] = useState( '' );
    const [ popularDestinations, setPopularDestinations ] = useState( [] );
    const [ topComments, setTopComments ] = useState( [] );

    const airportCodes = {
        Madrid: 'MAD',
        NuevaYork: 'JFK',
        Paris: 'CDG',
        Londres: 'LHR',
        Tokio: 'NRT'
    };

    const images = [
        { src: '/public/image 1.png', alt: 'img1' },
        { src: '/public/image 2.png', alt: 'img2' },
        { src: '/public/image 3.png', alt: 'img3' },
        { src: '/public/image 4.png', alt: 'img4' },
        { src: '/public/image 5.png', alt: 'img5' },
        { src: '/public/image 6.png', alt: 'img6' },
        { src: '/public/image 7.png', alt: 'img7' },
        { src: '/public/image 8.png', alt: 'img8' }
    ];

    useEffect( () => {
        const fetchedPopularDestinations = [
            { origen: 'Madrid', destino: 'Nueva York' },
            { origen: 'Londres', destino: 'Tokio' },
            { origen: 'Paris', destino: 'Londres' }
        ];
        setPopularDestinations( fetchedPopularDestinations );

        const fetchedTopComments = [
            { user: 'Usuario1', comment: 'Excelente servicio!', rating: 5 },
            { user: 'Usuario2', comment: 'Muy buena experiencia.', rating: 4 },
            { user: 'Usuario3', comment: 'Recomendado!', rating: 4 }
        ];
        setTopComments( fetchedTopComments );
    }, [] );

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        const origenCode = airportCodes[ origen ] || origen;
        const destinoCode = airportCodes[ destino ] || destino;

        const searchParams = {
            tipoViaje,
            fechaSalida,
            fechaLlegada,
            origen: origenCode,
            destino: destinoCode,
            pasajeros,
            claseBillete
        };

        fetch( 'https://api.example.com/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( searchParams )
        } )
            .then( response => response.json() )
            .then( data => console.log( data ) )
            .catch( error => console.error( 'Error:', error ) );
    };

    return (
        <>

            <div>
                <LogoAnimation />
                <PaperPlaneAnimation />
            </div>
            {/* Aquí va el componente Header */}
            <Header />
            <section>
                {/* Aquí va el componente SearchForm */}
                <SearchForm
                    tipoViaje={tipoViaje}
                    fechaSalida={fechaSalida}
                    fechaLlegada={fechaLlegada}
                    origen={origen}
                    destino={destino}
                    pasajeros={pasajeros}
                    claseBillete={claseBillete}
                    setTipoViaje={setTipoViaje}
                    setFechaSalida={setFechaSalida}
                    setFechaLlegada={setFechaLlegada}
                    setOrigen={setOrigen}
                    setDestino={setDestino}
                    setPasajeros={setPasajeros}
                    setClaseBillete={setClaseBillete}
                    handleSubmit={handleSubmit}
                />
                {/* Aquí va el componente CarouselImages */}
                <CarouselImages images={images} />
            </section>
            {CarouselImages}
            <RecentSearches />
            {/* Aquí va el componente PopularDestinations */}
            <PopularDestinations popularDestinations={popularDestinations} />
            {/* Aquí va el componente RatingsSummary */}
            <RatingsSummary topComments={topComments} />
            {/* teminamos con el footer*/}
        </>
    );
};

export default HomePage;