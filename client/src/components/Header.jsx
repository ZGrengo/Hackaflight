import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

// Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useAuthContext();

    return (
        <header className='flex sticky top-0 justify-around items-center bg-medium-blue w-full p-4 z-50 bg-opacity-80 backdrop-blur-md'>
            {/* Logo */}
            <nav className='flex gap-4 max-w-full'>
                <Link to='/'>
                    <img
                        src='/public/logo.svg'
                        alt='home'
                        className='rounded-full w-1/2 hover:scale-110 transition-transform duration-200'
                    />
                </Link>
            </nav>
            {/* Menú de navegación */}

            {authUser ? (
                <>
                    <div className='flex items-center gap-2'>
                        <Link to='/users/profile' className='mx-1'>
                            <img
                                src='/public/profile.svg'
                                alt='profile'
                                className='w-16 fill-current text-dark-blue hover:text-medium-blue hover:scale-150 transition-transform duration-200'
                            />
                        </Link>

                        <Link to='/users/ratings' className='mx-1'>
                            <img
                                src='/public/rating.svg'
                                alt='ratings'
                                className='w-16 fill-current text-dark-blue hover:text-medium-blue hover:scale-150 transition-transform duration-200'
                            />
                        </Link>
                        <button onClick={authLogoutState} className='mx-1'>
                            <img
                                src='/public/logout.svg'
                                alt='logout'
                                className='w-16 fill-current text-dark-blue hover:text-medium-blue hover:scale-150 transition-transform duration-200'
                            />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex items-center gap-2'>
                        <Link to='/login' className='mx-1'>
                            <img
                                src='/public/login.svg'
                                alt='login'
                                className='w-16 fill-current text-dark-blue hover:text-medium-blue hover:scale-150 transition-transform duration-200'
                            />
                        </Link>
                        <Link
                            to='/register'
                            className='mx-1'
                        >
                            <img
                                src='/public/registerUser.svg'
                                alt='register'
                                className='w-16 fill-current text-dark-blue hover:text-medium-blue hover:scale-150 transition-transform duration-200'
                            />
                        </Link>

                        <Link to='/ratings' className='mx-1'>
                            <img
                                src='/public/rating.svg'
                                alt='ratings'
                                className='w-16 fill-current text-dark-blue hover:text-medium-blue hover:scale-150 transition-transform duration-200'
                            />
                        </Link>
                    </div>
                </>
            )}
        </header >
    );
};

// Exportamos el componente
export default Header;