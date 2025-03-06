import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

// Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useAuthContext();

    return (
        <header className='sticky top-0 z-50 bg-dark-blue backdrop-blur-md shadow-md'>
            <div className='flex items-center justify-between px-4 py-3'>
                {/* Logo */}
                <Link to='/'>
                    <img
                        src='/public/logo.png'
                        alt='home'
                        className='w-auto h-9 object-contain transition-transform duration-200 hover:scale-105'
                    />
                </Link>

                {/* Menú de navegación */}
                <nav className='flex items-center space-x-3'>
                    {authUser ? (
                        <>
                            <Link to='/users/profile'>
                                <img
                                    src='/public/profile.svg'
                                    alt='profile'
                                    className='w-8 h-8 fill-current text-light-blue transition-tranform duration-200 hover:text-medium-blue hover:scale-110'
                                />
                            </Link>

                            <Link to='/users/ratings'>
                                <img
                                    src='/public/rating.svg'
                                    alt='ratings'
                                    className='w-8 h-8 fill-current text-light-blue transition-tranform duration-200 hover:text-medium-blue hover:scale-110'
                                />
                            </Link>

                            <Link to='/admin/users'>
                                <img
                                    src='/public/admin.png'
                                    alt='AdminUtils'
                                    className='w-8 h-8 fill-current text-light-blue transition-tranform duration-200 hover:text-medium-blue hover:scale-110'
                                />
                            </Link>
                            
                            <button onClick={authLogoutState}>
                                <img
                                    src='/public/logout.svg'
                                    alt='logout'
                                    className='w-8 h-8 fill-current text-light-blue transition-tranform duration-200 hover:text-medium-blue hover:scale-110'
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>
                                <img
                                    src='/public/login.svg'
                                    alt='login'
                                    className='w-8 h-8 fill-current text-light-blue transition-tranform duration-200 hover:text-medium-blue hover:scale-110'
                                />
                            </Link>
                            <Link to='/register'>
                                <img
                                    src='/public/registerUser.svg'
                                    alt='register'
                                    className='w-8 h-8 fill-current text-light-blue transition-tranform duration-200 hover:text-medium-blue hover:scale-110'
                                />
                            </Link>

                            <Link to='/ratings'>
                                <img
                                    src='/public/rating.svg'
                                    alt='ratings'
                                    className='w-8 h-8 fill-current text-light-blue transition-tranform duration-200 hover:text-medium-blue hover:scale-110'
                                />
                            </Link>

                         
                            
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

// Exportamos el componente
export default Header;
