import Header from '../components/Header';

// Inicializamos el componente.
const NotFoundPage = () => {
    return (
        <>
            <Header />
            <main className='bg-black min-h-screen flex flex-col items-center justify-center p-4'>
                <div className='max-w-sm w-full mx-auto text-center'>
                    <img
                        src='/error404.png'
                        alt='Error 404'
                        className='mx-auto mb-6 w-2/3 h-auto'
                    />
                    <h2 className='text-light-blue text-3xl font-bold mb-2'>
                        Página no encontrada
                    </h2>
                    <h3 className='text-light-blue text-xl font-semibold mb-4'>
                        Error 404
                    </h3>

                    <p className='text-light-blue mb-4'>
                        La página a la que intentas acceder no existe.
                    </p>

                    <a
                        href='/'
                        className='inline-block bg-medium-blue hover:bg-accent-blue text-white font-bold py-2 px-4 rounded transition-colors'
                    >
                        Volver al inicio
                    </a>
                </div>
            </main>
        </>
    );
};

export default NotFoundPage;
