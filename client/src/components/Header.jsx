import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

// Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useAuthContext();

    return (
        <header className='flex justify-around items-center bg-[#25779b] w-full p-4'>
            {/* Logo */}
            <nav className='flex gap-4 max-w-full'>
                <Link to='/'>
                    <img
                        src='/public/logo.svg'
                        alt='home'
                        className='rounded-full w-1/2'
                    />
                </Link>
            </nav>
            {/* Menú de navegación */}
            <nav className='flex items-center gap-12'>
                <Link to='/favorites' className='mr-8'>
                    <img
                        src='/public/corazon.png'
                        alt='favoritos'
                        className='w-8'
                    />
                </Link>

                {authUser ? (
                    <>
                        <div className='flex items-center gap-12'>
                            <Link to='/users/profile' className='mx-4'>
                                <img
                                    src='/public/users.png'
                                    alt='profile'
                                    className='w-8'
                                />
                            </Link>

                            <Link
                                to='/users/ratings'
                                className='text-white hover:text-[#E5F7FF] transition-colors mx-4'
                            >
                                <p>Deja tu Opinión!</p>
                            </Link>
                            <button onClick={authLogoutState} className='mx-4'>
                                <img
                                    src='/public/logout.png'
                                    alt='logout'
                                    className='w-8'
                                />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex items-center gap-12'>
                            <Link to='/login' className='mx-4'>
                                <img
                                    src='/public/Users.png'
                                    alt='login'
                                    className='w-8'
                                />
                            </Link>
                            <Link
                                to='/register'
                                className='bg-[#179DD9] text-white px-4 py-2 rounded-md hover:bg-[#3951AA] transition-colors'
                            >
                                Registrarse
                            </Link>

                            <Link
                                to='/ratings'
                                className='text-white hover:text-[#E5F7FF] transition-colors'
                            >
                                <p>Opiniones</p>
                            </Link>
                        </div>
                    </>
                )}
            </nav>
        </header>
    );
};

// Exportamos el componente
export default Header;
