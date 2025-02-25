// Importamos la función que indica cuál es la etiqueta raíz del html.
import { createRoot } from 'react-dom/client';

// Importamos los componentes.
import App from './App.jsx';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Importamos los estilos.
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
