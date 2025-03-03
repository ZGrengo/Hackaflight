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
import Footer from '../components/Footer';
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
    const { ratings } = useRatingList();
    const [ loading, setLoading ] = useState( false );

    const navigate = useNavigate();
    const { isAuthenticated } = useContext( AuthContext );

    useEffect( () => {
        setPopularDestinations( [
            { origen: 'Madrid', destino: 'Nueva York' },
            { origen: 'Londres', destino: 'Tokio' },
            { origen: 'Paris', destino: 'Londres' },
        ] );
    }, [] );

    const [ searchParams ] = useSearchParams();
    useEffect( () => {
        const returnDate = searchParams.get( "returnDate" );
        if ( returnDate )
        {
            setTipoViaje( 'ida-vuelta' );
        }
    }, [ searchParams ] );

    useEffect( () => {
        const origin = searchParams.get( "origin" );
        const destination = searchParams.get( "destination" );
        const departureDate = searchParams.get( "departureDate" );
        const adults = searchParams.get( "adults" );

        if ( origin && destination && departureDate && adults )
        {
            setOrigen( origin );
            setDestino( destination );
            setFechaSalida( departureDate.split( 'T' )[ 0 ] );
            setPasajeros( Number( adults ) );
        }
    }, [ searchParams ] );

    useEffect( () => {
        const returnDate = searchParams.get( "returnDate" );
        if ( tipoViaje === 'ida-vuelta' && returnDate )
        {
            setFechaRetorno( returnDate.split( 'T' )[ 0 ] );
        }
    }, [ tipoViaje, searchParams ] );

    const loadRecentSearches = () => {
        const storedSearches = localStorage.getItem( 'recentSearches' );
        if ( storedSearches )
        {
            setRecentSearches( JSON.parse( storedSearches ) );
        }
    };

    const saveRecentSearch = ( search ) => {
        let searches = localStorage.getItem( 'recentSearches' );
        searches = searches ? JSON.parse( searches ) : [];
        searches.unshift( search );
        if ( searches.length > 5 )
        {
            searches.pop();
        }
        localStorage.setItem( 'recentSearches', JSON.stringify( searches ) );
        setRecentSearches( searches );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );

        if ( isAuthenticated )
        {
            loadRecentSearches();
        }

        const searchParams = new URLSearchParams( {
            origin: origen,
            destination: destino,
            departureDate: fechaSalida,
            adults: pasajeros,
        } );

        try
        {
            const resIda = await fetch(
                `${ VITE_API_URL }/api/flights/search?${ searchParams.toString() }`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if ( !resIda.ok ) throw new Error( 'Network response was not ok' );
            const bodyIda = await resIda.json();
            if ( bodyIda.status === 'error' ) throw new Error( bodyIda.message );

            let flights = bodyIda || [];

            if ( tipoViaje === 'ida-vuelta' && fechaRetorno )
            {
                const searchParamsVuelta = new URLSearchParams( {
                    origin: origen,
                    destination: destino,
                    departureDate: fechaSalida,
                    returnDate: fechaRetorno,
                    adults: pasajeros,
                } );

                const resVuelta = await fetch(
                    `${ VITE_API_URL }/api/flights/search?${ searchParamsVuelta.toString() }`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                if ( !resVuelta.ok ) throw new Error( 'Network response was not ok' );
                const bodyVuelta = await resVuelta.json();
                if ( bodyVuelta.status === 'error' ) throw new Error( bodyVuelta.message );

                flights = [ ...flights || [] ];
            }

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
            console.log( 'Error al buscar vuelos:', err );
        } finally
        {
            setLoading( false );
        }
    };

    const handleRepeatSearch = ( search ) => {
        setOrigen( search.origen );
        setDestino( search.destino );
        setFechaSalida( search.fechaSalida );
        setFechaRetorno( search.fechaRetorno );
        setPasajeros( search.pasajeros );
        setTipoViaje( search.tipoViaje );
        handleSubmit();
    };


    const handleSaveFavorite = ( search ) => {
        const favorites = localStorage.getItem( 'favorites' );
        const newFavorites = favorites ? JSON.parse( favorites ) : [];
        newFavorites.unshift( search );
        localStorage.setItem( 'favorites', JSON.stringify( newFavorites ) );
        console.log( 'Guardado en favoritos:', search );
    };

    return (

        <section>
            <LogoAnimation />
            <PaperPlaneAnimation />
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
            <section className="relative w-full h-full">
                <section className="relative z-10">
                    {loading ? (
                        <section className="text-center">
                            <section className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-dark-blue mx-auto"></section>
                            <h2 className="text-zinc-900 dark:text-zinc-400 mt-4">Loading...</h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Your adventure is about to begin
                            </p>
                        </section>
                    ) : null}
                </section>
                {isAuthenticated && (
                    <RecentSearches
                        recentSearches={recentSearches}
                        onRepeatSearch={handleRepeatSearch}
                        onSaveFavorite={handleSaveFavorite}
                    />
                )}

                <PopularDestinations popularDestinations={popularDestinations} />
                <RatingSumary ratings={ratings} />
                <Footer />
            </section>
        </section>
    );
}

export default HomePage;
