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

// importamos la variable de entorno
const { VITE_API_URL } = import.meta.env;

// definimos los estados iniciales
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

    // usamos el hook useNavigate para navegar entre rutas
    const navigate = useNavigate();
    const { isAuthenticated } = useContext( AuthContext );

    // usamos el hook useEffect para cargar las búsquedas recientes de ejemplo
    useEffect( () => {
        setPopularDestinations( [
            { origen: 'Madrid', destino: 'Nueva York' },
            { origen: 'Londres', destino: 'Tokio' },
            { origen: 'Paris', destino: 'Londres' },
        ] );
    }, [] );

    // useEffect para tomar los parametros de la pagina de favoritos con la busqueda que el usuario quiere repetir
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

    // Nuevo useEffect SOLO para fecha de retorno, ejecutado después de actualizar `tipoViaje`
    useEffect( () => {
        const returnDate = searchParams.get( "returnDate" );
        if ( tipoViaje === 'ida-vuelta' && returnDate )
        {
            setFechaRetorno( returnDate.split( 'T' )[ 0 ] );
        }
    }, [ tipoViaje, searchParams ] );

    // definimos la función para guardar las búsquedas recientes
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

    // definimos la función para buscar vuelos
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );

        const searchParams = new URLSearchParams( {
            origin: origen,
            destination: destino,
            departureDate: fechaSalida,
            adults: pasajeros,
        } );

        console.log( 'Search parameters:', searchParams.toString() );

        try
        {
            // realizamos la petición a la API para vuelos de ida
            const res = await fetch(
                `${ VITE_API_URL }/api/flights/search?${ searchParams.toString() }`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log( 'Response status:', res.status );

            if ( !res.ok ) throw new Error( 'Network response was not ok' );
            const body = await res.json();
            console.log( 'Response body:', body );

            if ( body.status === 'error' ) throw new Error( body.message );

            const idaFlights = Array.isArray( body ) ? body : [];
            const vueltaFlights = [];

            // si el tipo de viaje es de ida y vuelta, buscamos también los vuelos de vuelta
            if ( tipoViaje === 'ida-vuelta' && fechaRetorno )
            {
                const searchParamsVuelta = new URLSearchParams( {
                    origin: destino,
                    destination: origen,
                    departureDate: fechaRetorno,
                    adults: pasajeros,
                } );

                console.log( 'Return search parameters:', searchParamsVuelta.toString() );

                // realizamos la petición a la API para vuelos de vuelta
                const resVuelta = await fetch(
                    `${ VITE_API_URL }/api/flights/search?${ searchParamsVuelta.toString() }`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );

                console.log( 'Return response status:', resVuelta.status );

                // si la respuesta no es correcta, lanzamos un error
                if ( !resVuelta.ok ) throw new Error( 'Network response was not ok' );
                const bodyVuelta = await resVuelta.json();
                console.log( 'Return response body:', bodyVuelta );

                if ( bodyVuelta.status === 'error' ) throw new Error( bodyVuelta.message );
                vueltaFlights.push( ...( Array.isArray( bodyVuelta ) ? bodyVuelta : [] ) );
            }

            // add isReturn property to distinguish
            const flights = [];
            idaFlights.forEach( flight => flights.push( { ...flight, isReturn: false } ) );
            vueltaFlights.forEach( flight => flights.push( { ...flight, isReturn: true } ) );

            console.log( 'Fetched flights:', flights );

            // navegamos a la página de resultados de búsqueda con los vuelos unificados
            navigate( '/search-results', { state: { flights } } );

            // guardamos la búsqueda reciente
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

    // definimos las funciones para repetir y guardar búsquedas
    const handleRepeatSearch = ( search ) => {
        setOrigen( search.origen );
        setDestino( search.destino );
        setFechaSalida( search.fechaSalida );
        setFechaRetorno( search.fechaRetorno );
        setPasajeros( search.pasajeros );
        setTipoViaje( search.tipoViaje );
        handleSubmit();
    };

    // definimos la función para guardar en favoritos
    const handleSaveFavorite = ( search ) => {
        const favorites = localStorage.getItem( 'favorites' );
        const newFavorites = favorites ? JSON.parse( favorites ) : [];
        newFavorites.unshift( search );
        localStorage.setItem( 'favorites', JSON.stringify( newFavorites ) );
        console.log( 'Guardado en favoritos:', search );
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
            <section className="relative w-full h-full">
                <section className="relative z-10"></section>
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
        </>
    );
};

export default HomePage;
