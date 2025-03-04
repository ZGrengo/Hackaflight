import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useRatingList from '../hooks/useRatingList';
import SearchForm from '../components/SearchForm';
import CarouselImages from '../components/CarouselImages';
import RecentSearches from '../components/RecentSearches';
import PopularDestinations from '../components/PopularDestinations';
import Header from '../components/Header';
import LogoAnimation from '../components/LogoAnimation';
import PaperPlaneAnimation from '../components/PaperPlaneAnimation';
import RatingSumary from '../components/RatingSumary';
import { AuthContext } from '../contexts/AuthContext';

const { VITE_API_URL } = import.meta.env;

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

    const navigate = useNavigate();
    const { isAuthenticated } = useContext( AuthContext );
    const [ searchParams ] = useSearchParams();
    const { ratings } = useRatingList();

    // Load popular destinations on mount
    useEffect( () => {
        setPopularDestinations( [
            { origen: 'Madrid', destino: 'Nueva York' },
            { origen: 'Londres', destino: 'Tokio' },
            { origen: 'Paris', destino: 'Londres' },
        ] );
    }, [] );

    // Handle search params from URL
    useEffect( () => {
        const origin = searchParams.get( 'origin' );
        const destination = searchParams.get( 'destination' );
        const departureDate = searchParams.get( 'departureDate' );
        const adults = searchParams.get( 'adults' );
        const returnDate = searchParams.get( 'returnDate' );

        if ( origin && destination && departureDate && adults )
        {
            setOrigen( origin );
            setDestino( destination );
            setFechaSalida( departureDate.split( 'T' )[ 0 ] );
            setPasajeros( Number( adults ) );
        }

        if ( returnDate )
        {
            setTipoViaje( 'ida-vuelta' );
            setFechaRetorno( returnDate.split( 'T' )[ 0 ] );
        }
    }, [ searchParams ] );

    // Save recent searches to localStorage
    const saveRecentSearch = ( search ) => {
        const searches = JSON.parse( localStorage.getItem( 'recentSearches' ) || '[]' );
        searches.unshift( search );
        if ( searches.length > 5 ) searches.pop();
        localStorage.setItem( 'recentSearches', JSON.stringify( searches ) );
        setRecentSearches( searches );
    };

    // Fetch flights from the API
    const fetchFlights = async ( params ) => {
        const res = await fetch( `${ VITE_API_URL }/api/flights/search?${ params.toString() }`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        } );

        if ( !res.ok ) throw new Error( 'Network response was not ok' );
        const body = await res.json();
        if ( body.status === 'error' ) throw new Error( body.message );

        return Array.isArray( body ) ? body : [];
    };

    // Handle form submission
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );
        setError( null );

        try
        {
            const searchParams = new URLSearchParams( {
                origin: origen,
                destination: destino,
                departureDate: fechaSalida,
                adults: pasajeros,
            } );

            if ( tipoViaje === 'ida-vuelta' && fechaRetorno )
            {
                searchParams.append( 'returnDate', fechaRetorno );
            }

            const flights = await fetchFlights( searchParams );

            if ( tipoViaje === 'ida-vuelta' && fechaRetorno )
            {
                const searchParamsVuelta = new URLSearchParams( {
                    origin: destino,
                    destination: origen,
                    departureDate: fechaRetorno,
                    adults: pasajeros,
                } );

                const returnFlights = await fetchFlights( searchParamsVuelta );
                flights.push( ...returnFlights.map( flight => ( { ...flight, isReturn: true } ) ) );
            }

            navigate( '/search-results', { state: { flights } } );
            saveRecentSearch( { origen, destino, fechaSalida, fechaRetorno, pasajeros, tipoViaje } );
        } catch ( err )
        {
            console.error( 'Error al buscar vuelos:', err );
            setError( 'Failed to fetch flights. Please try again later.' );
        } finally
        {
            setLoading( false );
        }
    };

    // Repeat a recent search
    const handleRepeatSearch = ( search ) => {
        setOrigen( search.origen );
        setDestino( search.destino );
        setFechaSalida( search.fechaSalida );
        setFechaRetorno( search.fechaRetorno );
        setPasajeros( search.pasajeros );
        setTipoViaje( search.tipoViaje );
        handleSubmit();
    };

    // Save a search to favorites
    const handleSaveFavorite = ( search ) => {
        const favorites = JSON.parse( localStorage.getItem( 'favorites' ) || '[]' );
        favorites.unshift( search );
        localStorage.setItem( 'favorites', JSON.stringify( favorites ) );
    };

    return (
        <>
            <section>
                <LogoAnimation />
                <PaperPlaneAnimation />
            </section>
            <Header />
            <section className="relative w-full h-screen">
                <CarouselImages />
                <section className="absolute inset-0 flex items-center justify-center z-10">
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
                </section>
            </section>
            {loading && (
                <section className="text-center">
                    <section className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-dark-blue mx-auto"></section>
                    <h2 className="text-zinc-900 dark:text-zinc-400 mt-4">Loading...</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">Your adventure is about to begin</p>
                </section>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {isAuthenticated && (
                <RecentSearches
                    recentSearches={recentSearches}
                    onRepeatSearch={handleRepeatSearch}
                    onSaveFavorite={handleSaveFavorite}
                />
            )}
            <PopularDestinations popularDestinations={popularDestinations} />
            <RatingSumary ratings={ratings} />
        </>
    );
};

export default HomePage;