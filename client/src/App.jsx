// Importamos los componentes.
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

// Importamos las páginas.
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AdminListUsers from './pages/AdminListUsers';
import NotFoundPage from './pages/NotFoundPage';
import ValidateUserPage from './pages/ValidateUserPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <>
            <Toaster position="top-center" />
            {/* Todos los endpoints han de definirse dentro de este compontente. */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search-results" element={<SearchResultsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin/users" element={<AdminListUsers />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/validate/:regCode" element={<ValidateUserPage />} />
                <Route path="/users/profile" element={<UserProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
