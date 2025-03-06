import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useRatingList from '../hooks/useRatingList';
import SearchForm from '../components/SearchForm';
import CarouselImages from '../components/CarouselImages';
import RecentSearches from '../components/RecentSearches';
import PopularDestinations from '../components/PopularDestinations';
import Header from '../components/Header';
import LogoAnimation from '../components/LogoAnimation';
import PaperPlaneAnimation from '../components/PaperPlaneAnimation';
import { AuthContext } from '../contexts/AuthContext';
import RatingsSummary from '../components/RatingsSummary';

// Obtenemos las variables de entorno
const { VITE_API_URL } = import.meta.env;

// Página de inicio
const HomePage = () => {
    const [ tipoViaje, setTipoViaje ] = useState( 'ida' );
    const [ fechaSalida, setFechaSalida ] = useState( '' );
    const [ fechaRetorno, setFechaRetorno ] = useState( '' );
    const [ origen, setOrigen ] = useState( '' );
    const [ destino, setDestino ] = useState( '' );
    const [ pasajeros, setPasajeros ] = useState( 1 );
    const [ popularDestinations, setPopularDestinations ] = useState( [] );
    const [ recentSearches, setRecentSearches ] = useState( [] );
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( null );

    // Hook para navegar entre rutas
    const navigate = useNavigate();
    const { isAuthenticated } = useContext( AuthContext );
    const [ searchParams ] = useSearchParams();
    const { ratings } = useRatingList();

    // Hook para cargar las búsqueda populares
    useEffect( () => {
        setPopularDestinations( [
            { origen: 'Madrid', destino: 'Nueva York' },
            { origen: 'Londres', destino: 'Tokio' },
            { origen: 'Paris', destino: 'Londres' },
        ] );
    }, [] );

    // Hook para cargar las búsquedas recientes
    useEffect( () => {
        const origin = searchParams.get( 'origin' );
        const destination = searchParams.get( 'destination' );
        const departureDate = searchParams.get( 'departureDate' );
        const adults = searchParams.get( 'adults' );
        const returnDate = searchParams.get( 'returnDate' );
        if ( returnDate )
        {
            // Si hay fecha de retorno, establecemos el tipo de viaje a ida y vuelta
            setTipoViaje( 'ida-vuelta' );
            setFechaRetorno( returnDate.split( 'T' )[ 0 ] );
        }
        // Establecemos los valores de los campos del formulario
        setOrigen( origin || '' );
        setDestino( destination || '' );
        setFechaSalida( departureDate || '' );
        setPasajeros( adults ? parseInt( adults, 10 ) : 1 );
    }, [ searchParams ] );

    // Hook para cargar las búsquedas recientes
    const loadRecentSearches = () => {
        const searches = JSON.parse( localStorage.getItem( 'recentSearches' ) || '[]' );
        setRecentSearches( searches );
    };

    // Hook para cargar las búsquedas recientes si se está autenticado
    useEffect( () => {
        if ( isAuthenticated )
        {
            loadRecentSearches();
        }
    }, [ isAuthenticated ] );

    // Función para guardar la búsqueda reciente
    const saveRecentSearch = ( search ) => {
        const searches = JSON.parse( localStorage.getItem( 'recentSearches' ) || '[]' );
        searches.unshift( search );
        if ( searches.length > 5 ) searches.pop();
        localStorage.setItem( 'recentSearches', JSON.stringify( searches ) );
        setRecentSearches( searches );
    };

    // Función para buscar vuelos
    const fetchFlights = async ( params ) => {
        try
        {
            const res = await fetch( `${ VITE_API_URL }/api/flights/search?${ params.toString() }`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            } );

            if ( !res.ok ) throw new Error( 'Network response was not ok' );
            const body = await res.json();
            if ( body.status === 'error' ) throw new Error( body.message );

            return Array.isArray( body ) ? body : [];
        } catch ( error )
        {
            console.error( 'Error fetching flights:', error );
            throw error;
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );
        setError( null );

        // Validate dates
        if ( tipoViaje === 'ida-vuelta' && new Date( fechaRetorno ) < new Date( fechaSalida ) )
        {
            setError( 'Return date cannot be before departure date.' );
            setLoading( false );
            return;
        }

        try
        {
            // Create search parameters
            const searchParams = new URLSearchParams( {
                origin: origen,
                destination: destino,
                departureDate: fechaSalida,
                adults: pasajeros,
            } );

            // Add return date if round trip
            if ( tipoViaje === 'ida-vuelta' && fechaRetorno )
            {
                searchParams.append( 'returnDate', fechaRetorno );
            }

            // Fetch flights
            const flights = await fetchFlights( searchParams );

            // Fetch return flights if round trip
            if ( tipoViaje === 'ida-vuelta' && fechaRetorno )
            {
                const searchParamsVuelta = new URLSearchParams( {
                    origin: origen,
                    destination: destino,
                    departureDate: fechaSalida,
                    returnDate: fechaRetorno,
                    adults: pasajeros,
                } );

                const returnFlights = await fetchFlights( searchParamsVuelta );
                flights.push(
                    ...returnFlights.map( ( flight ) => ( {
                        ...flight,
                        isReturn: true,
                    } ) )
                );
            }

            // Navigate to search results
            navigate( '/search-results', { state: { flights } } );
            saveRecentSearch( {
                origen,
                destino,
                fechaSalida,
                fechaRetorno,
                pasajeros,
                tipoViaje,
            } );
        } catch ( err )
        {
            console.error( 'Error al buscar vuelos:', err );
            setError( 'Failed to fetch flights. Please try again later.' );
            toast.error( 'Error al buscar vuelos, inténtelo de nuevo más tarde.' );
        } finally
        {
            setLoading( false );
        }
    };


    // Función para repetir una búsqueda reciente
    const handleRepeatSearch = ( search ) => {
        setOrigen( search.origen );
        setDestino( search.destino );
        setFechaSalida( search.fechaSalida );
        setFechaRetorno( search.fechaRetorno );
        setPasajeros( search.pasajeros );
        setTipoViaje( search.tipoViaje );
        handleSubmit( new Event( 'submit', { bubbles: true, cancelable: true } ) );
    };

    // Función para guardar una búsqueda como favorita
    const handleSaveFavorite = ( search ) => {
        const favorites = JSON.parse( localStorage.getItem( 'favorites' ) || '[]' );
        favorites.unshift( search );
        localStorage.setItem( 'favorites', JSON.stringify( favorites ) );
    };

    // Renderizamos el componente
    return (
        <>
            <section>
                <LogoAnimation />
                <PaperPlaneAnimation />
            </section>
            <Header />
            <section className='relative w-full h-[45vh] inset-0 items-center justify-center'>
                <CarouselImages />
                <section className='absolute flex items-center justify-center bottom-60 z-20'>
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
                    {/* Mostramos un mensaje de carga si está cargando */}
                    {loading && (
                        <section className='absolute text-center top-56 z-30'>
                            <section className='w-24 h-24 border-8 border-dashed rounded-full animate-spin border-accent-blue mx-auto my-10'></section>
                            <h2 className='text-slate-50 text-3xl font-bold'>
                                Loading...
                            </h2>
                            <br></br>
                            <p className='text-slate-50 text-2xl font-medium'>
                                Your adventure is about to begin
                            </p>
                        </section>
                    )}
                </section>
                {/* Mostramos un mensaje de error si hay uno */}
                {error && <p className='text-red-500 text-center'>{error}</p>}
            </section>
            {/* Mostramos las búsquedas recientes si está autenticado */}
            {isAuthenticated && (
                <RecentSearches
                    recentSearches={recentSearches}
                    onRepeatSearch={handleRepeatSearch}
                    onSaveFavorite={handleSaveFavorite}
                />
            )}
            {/* Mostramos los destinos populares y el resumen de calificaciones */}
            <section className='mb-5'>
                <PopularDestinations popularDestinations={popularDestinations} />
                <RatingsSummary ratings={ratings} />
            </section>
        </>
    );
};

export default HomePage;