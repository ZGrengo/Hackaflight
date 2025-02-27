import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import CarouselImages from '../components/CarouselImages';
import RecentSearches from '../components/RecentSearches';
import PopularDestinations from '../components/PopularDestinations';
import RatingSummary from '../components/RatingSumary';
import Header from '../components/Header';
import LogoAnimation from '../components/LogoAnimation';
import PaperPlaneAnimation from '../components/PaperPlaneAnimation';

const { VITE_API_URL } = import.meta.env;

const HomePage = () => {
    const [tipoViaje, setTipoViaje] = useState('ida');
    const [fechaSalida, setFechaSalida] = useState('');
    const [fechaLlegada, setFechaLlegada] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [pasajeros, setPasajeros] = useState(1);
    const [claseBillete, setClaseBillete] = useState('');
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [topComments, setTopComments] = useState([]);
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
        setTopComments([
            { user: 'Usuario1', comment: 'Excelente servicio!', rating: 5 },
            { user: 'Usuario2', comment: 'Muy buena experiencia.', rating: 4 },
            { user: 'Usuario3', comment: 'Recomendado!', rating: 4 },
        ]);
    }, []);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            setLoading(true);

            const searchParams = new URLSearchParams({
                origin: origen,
                destination: destino,
                departureDate: fechaSalida,
                adults: pasajeros,
            });

            if (tipoViaje === 'ida-vuelta') {
                searchParams.append('returnDate', fechaLlegada);
            }
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
                console.log(body);
                navigate('/search', { state: { flights: body.flights } });
            } catch (err) {
                console.log('Error al buscar vuelos:', err);
            } finally {
                setLoading(false);
            }
        },
        [
            origen,
            destino,
            fechaSalida,
            fechaLlegada,
            pasajeros,
            tipoViaje,
            navigate,
        ],
    );

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
                    fechaRetorno={fechaLlegada}
                    origen={origen}
                    destino={destino}
                    pasajeros={pasajeros}
                    claseBillete={claseBillete}
                    setTipoViaje={setTipoViaje}
                    setFechaSalida={setFechaSalida}
                    setFechaRetorno={setFechaLlegada}
                    setOrigen={setOrigen}
                    setDestino={setDestino}
                    setPasajeros={setPasajeros}
                    setClaseBillete={setClaseBillete}
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
            <RatingSummary topComments={topComments} />
        </>
    );
};

export default HomePage;
