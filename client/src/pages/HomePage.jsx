//importamos los hooks
import useRatingList from '../hooks/useRatingList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// importacion de componentes
import SearchForm from '../components/SearchForm';
import CarouselImages from '../components/CarouselImages';
import RecentSearches from '../components/RecentSearches';
import PopularDestinations from '../components/PopularDestinations';
import Header from '../components/Header';
import LogoAnimation from '../components/LogoAnimation';
import PaperPlaneAnimation from '../components/PaperPlaneAnimation';
import Footer from '../components/Footer';
import RatingsSummary from '../components/RatingSumary';

//importamos variables de entorno
const { VITE_API_URL } = import.meta.env;

const HomePage = () => {
    const [ tipoViaje, setTipoViaje ] = useState( 'ida' );
    const [ fechaSalida, setFechaSalida ] = useState( '' );
    const [ fechaRetorno, setFechaRetorno ] = useState( '' );
    const [ origen, setOrigen ] = useState( '' );
    const [ destino, setDestino ] = useState( '' );
    const [ pasajeros, setPasajeros ] = useState( 1 );
    const [ popularDestinations, setPopularDestinations ] = useState( [] );
    // Obtenemos los elementos necesarios del hook que retorna el listado de valoraciones.
    const { ratings } = useRatingList();
    const [ loading, setLoading ] = useState( false );

    const navigate = useNavigate();

    const images = [
        { src: '/public/image1.png', alt: 'img1' },
        { src: '/public/image2.png', alt: 'img2' },
        { src: '/public/image3.png', alt: 'img3' },
        { src: '/public/image4.png', alt: 'img4' },
        { src: '/public/image5.png', alt: 'img5' },
        { src: '/public/image6.png', alt: 'img6' },
        { src: '/public/image7.png', alt: 'img7' },
        { src: '/public/image8.png', alt: 'img8' },
    ];

    useEffect( () => {
        setPopularDestinations( [
            { origen: 'Madrid', destino: 'Nueva York' },
            { origen: 'Londres', destino: 'Tokio' },
            { origen: 'Paris', destino: 'Londres' },
        ] );
        // setTopComments([
        //     { user: 'Usuario1', comment: 'Excelente servicio!', rating: 5 },
        //     { user: 'Usuario2', comment: 'Muy buena experiencia.', rating: 4 },
        //     { user: 'Usuario3', comment: 'Recomendado!', rating: 4 },
        // ]);
    }, [] );

    // Función para enviar la solicitud de búsqueda de vuelos
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );

        // Verifica los datos de entrada
        console.log( 'Tipo de Viaje:', tipoViaje );
        const searchParams = new URLSearchParams( {
            origin: origen,
            destination: destino,
            departureDate: fechaSalida,
            adults: pasajeros,
        } );

        // Verifica los parámetros de búsqueda
        console.log( 'Search Params:', searchParams.toString() );

        try
        {
            // Realiza la solicitud de búsqueda de vuelos de ida
            const resIda = await fetch(
                `${ VITE_API_URL }/api/flights/search?${ searchParams.toString() }`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            // si la respuesta no es correcta, lanza un error
            if ( !resIda.ok ) throw new Error( 'Network response was not ok' );
            const bodyIda = await resIda.json();

            // si la respuesta es un error, lanza un error
            if ( bodyIda.status === 'error' ) throw new Error( bodyIda.message );
            console.log( 'API Response Ida:', bodyIda.message );

            // Verifica la respuesta de la API
            const flightsIda = bodyIda || [];
            console.log( 'Flights Ida:', flightsIda );

            let flightsVuelta = [];

            // si el tipo de viaje es de ida y vuelta
            if ( tipoViaje === 'ida-vuelta' && fechaRetorno )
            {
                const searchParamsVuelta = new URLSearchParams( {
                    origin: destino,
                    destination: origen,
                    departureDate: fechaRetorno,
                    adults: pasajeros,
                } );

                // Verifica los parámetros de búsqueda de vuelta
                console.log( 'Search Params Vuelta:', searchParamsVuelta.toString() );

                // Realiza la solicitud de búsqueda de vuelos de vuelta
                const resVuelta = await fetch(
                    `${ VITE_API_URL }/api/flights/search?${ searchParamsVuelta.toString() }`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                // si la respuesta no es correcta, lanza un error
                if ( !resVuelta.ok ) throw new Error( 'Network response was not ok' );
                const bodyVuelta = await resVuelta.json();

                // si la respuesta es un error, lanza un error
                if ( bodyVuelta.status === 'error' ) throw new Error( bodyVuelta.message );
                console.log( 'API Response Vuelta:', bodyVuelta );

                // Verifica la respuesta de la API
                flightsVuelta = bodyVuelta || [];
                console.log( 'Flights Vuelta:', flightsVuelta );
            }

            // Combina los resultados de ida y vuelta
            const flights = { ida: flightsIda, vuelta: flightsVuelta };
            console.log( 'Combined Flights:', flights );

            // Navega a la página de resultados de búsqueda con los datos de los vuelos
            navigate( '/search-results', { state: { flights } } );
        } catch ( err )
        {
            // Captura los errores
            console.log( 'Error al buscar vuelos:', err );
        } finally
        {
            // Finaliza la carga
            setLoading( false );
        }
    };

    // Renderiza la página de inicio
    return (
        <>
            <div>
                <LogoAnimation />
                <PaperPlaneAnimation />
            </div>
            <Header />
            <section>
                <SearchForm
                    tipoViaje={tipoViaje}
                    fechaSalida={fechaSalida}
                    fechaRetorno={fechaRetorno}
                    origen={origen}
                    destino={destino}
                    pasajeros={pasajeros}
                    setTipoViaje={setTipoViaje}
                    setFechaSalida={setFechaSalida}
                    setFechaRetorno={setFechaRetorno}
                    setOrigen={setOrigen}
                    setDestino={setDestino}
                    setPasajeros={setPasajeros}
                    handleSubmit={handleSubmit}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <CarouselImages images={images} />
                )}
            </section>
            <RecentSearches />
            <PopularDestinations popularDestinations={popularDestinations} />
            {/*para mostrar las valoraciones*/}
            <RatingsSummary ratings={ratings} />
            <Footer />
        </>
    );
};

export default HomePage;
