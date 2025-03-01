//importamos los hooks
import useRatingList from '../hooks/useRatingList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

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
    const [tipoViaje, setTipoViaje] = useState('ida');
    const [fechaSalida, setFechaSalida] = useState('');
    const [fechaRetorno, setFechaRetorno] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [pasajeros, setPasajeros] = useState(1);
    const [popularDestinations, setPopularDestinations] = useState([]);
    // Obtenemos los elementos necesarios del hook que retorna el listado de valoraciones.
    const { ratings } = useRatingList();
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        setPopularDestinations([
            { origen: 'Madrid', destino: 'Nueva York' },
            { origen: 'Londres', destino: 'Tokio' },
            { origen: 'Paris', destino: 'Londres' },
        ]);
        // setTopComments([
        //     { user: 'Usuario1', comment: 'Excelente servicio!', rating: 5 },
        //     { user: 'Usuario2', comment: 'Muy buena experiencia.', rating: 4 },
        //     { user: 'Usuario3', comment: 'Recomendado!', rating: 4 },
        // ]);
    }, []);

    // useEffect para tomar los parametros de la pagina de favoritos con la busqueda que el usuario quiere repetir
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const origin = searchParams.get("origin");
        const destination = searchParams.get("destination");
        const departureDate = searchParams.get("departureDate");
        const adults = searchParams.get("adults");
    
        if (origin && destination && departureDate && adults) {
            setOrigen(origin);
            setDestino(destination);
            setFechaSalida(departureDate.split('T')[0]); //Extrae solo la fecha en formato YYYY-MM-DD
            setPasajeros(Number(adults));
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const searchParams = new URLSearchParams({
            origin: origen,
            destination: destino,
            departureDate: fechaSalida,
            adults: pasajeros,
        });

        if (tipoViaje === 'ida-vuelta' && fechaRetorno) {
            searchParams.append('returnDate', fechaRetorno);
        }
        console.log('Search Params:', searchParams.toString()); // Verifica los parámetros de búsqueda

        try {
            const res = await fetch(
                `${VITE_API_URL}api/flights/search?${searchParams.toString()}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            if (!res.ok) throw new Error('Network response was not ok');
            const body = await res.json();
            if (body.status === 'error') throw new Error(body.message);
            console.log('API Response:', body);
            // Verifica la respuesta de la API

            const flights = body || [];
            console.log('Flights:', flights);
            // Verifica los datos de los Vuelos

            navigate('/search-results', { state: { flights } });
        } catch (err) {
            console.log('Error al buscar vuelos:', err);
        } finally {
            setLoading(false);
        }
    };

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
                    fechaLlegada={fechaRetorno}
                    origen={origen}
                    destino={destino}
                    pasajeros={pasajeros}
                    setTipoViaje={setTipoViaje}
                    setFechaSalida={setFechaSalida}
                    setFechaLlegada={setFechaRetorno}
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
