// Importamos los componentes necesarios
import { Link } from 'react-router-dom';

// Inicializamos el componente
const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/"><img src="/public/logo.svg" alt="home" /></Link>
                    </li>
                    <li>
                        <Link to="/favorites"><img src="/public/corazon.png" alt="favoritos" /></Link>
                    </li>
                    <li>
                        <Link to="/login"><img src="/public/Users.png" alt="login" /></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

// Exportamos el componente
export default Header;