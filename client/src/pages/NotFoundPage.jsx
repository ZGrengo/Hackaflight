import Header from '../components/Header';

// Inicializamos el componente.
const NotFoundPage = () => {
    return (
        <>
            <Header />
            <main>
                <h2>Página no encontrada - Error 404</h2>

                <p>La página a la que intentas acceder no existe.</p>
            </main>
        </>
    );
};

export default NotFoundPage;
