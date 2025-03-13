import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';

// Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useAuthContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className='sticky top-0 z-50 bg-dark-blue backdrop-blur-md shadow-md'>
            <div className='flex items-center justify-between px-4 py-3'>
                {/* Logo */}
                <Link to='/'>
                    <img
                        src='/logo.png'
                        alt='home'
                        className='w-auto h-9 object-contain transition-transform duration-200 hover:scale-105'
                    />
                </Link>

                {/* Menú de navegación */}
                <nav className='hidden md:flex items-center space-x-3'>
                    {authUser ? (
                        <>
                            {authUser.role === 'admin' && (
                                <Link to='/admin/users'>
                                    <img
                                        src='/admin.svg'
                                        alt='AdminUtils'
                                        className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                    />
                                </Link>
                            )}

                            <Link to='/favorites'>
                                <img
                                    src='/corazon.svg'
                                    alt='favorites'
                                    className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                />
                            </Link>
                            <Link to='/users/profile'>
                                <img
                                    src='/profile.svg'
                                    alt='profile'
                                    className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                />
                            </Link>
                            <Link to='/users/ratings'>
                                <img
                                    src='/rating.svg'
                                    alt='ratings'
                                    className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                />
                            </Link>
                            <button onClick={authLogoutState}>
                                <img
                                    src='/logout.svg'
                                    alt='logout'
                                    className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login'>
                                <img
                                    src='/login.svg'
                                    alt='login'
                                    className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                />
                            </Link>
                            <Link to='/register'>
                                <img
                                    src='/registerUser.svg'
                                    alt='register'
                                    className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                />
                            </Link>

                            <Link to='/ratings'>
                                <img
                                    src='/rating.svg'
                                    alt='ratings'
                                    className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                                />
                            </Link>
                        </>
                    )}
                </nav>

                {/*menu hamburguesa para moviles */}
                <div className='md:hidden'>
                    <button onClick={toggleMobileMenu}>
                        <img
                            src='/hamburguesa.svg'
                            alt='Menú'
                            className='w-8 h-8 transition-transform duration-200 hover:scale-110'
                        />
                    </button>
                </div>
            </div>

            {/* Menu móvil */}
            {isMobileMenuOpen && (
                <nav className='md:hidden bg-light-blue'>
                    <ul className='flex flex-col space-y-2 px-4 py-3'>
                        {authUser ? (
                            <>
                                {authUser.role === 'admin' && (
                                    <li className='w-full text-center fond-button text-dark-blue'>
                                        <Link
                                            to='/admin/users'
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            Utilidades Administrador
                                        </Link>
                                    </li>
                                )}
                                <li className='w-full text-center fond-button text-dark-blue'>
                                    <Link
                                        to='/users/profile'
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Perfil
                                    </Link>
                                </li>
                                <li className='w-full text-center fond-button text-dark-blue'>
                                    <Link
                                        to='/favorites'
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Favoritos
                                    </Link>
                                </li>
                                <li className='w-full text-center fond-button text-dark-blue'>
                                    <Link
                                        to='/users/ratings'
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Valoraciones
                                    </Link>
                                </li>
                                <li className='w-full text-center fond-button text-dark-blue'>
                                    <button
                                        onClick={() => {
                                            authLogoutState();
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='w-full text-center fond-button text-dark-blue'>
                                    <Link
                                        to='/login'
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </li>
                                <li className='w-full text-center fond-button text-dark-blue'>
                                    <Link
                                        to='/register'
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Registrarse
                                    </Link>
                                </li>
                                <li className='flex w-full text-center fond-button text-dark-blue'>
                                    <Link
                                        to='/ratings'
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        Valoraciones
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
};

// Exportamos el componente
export default Header;
