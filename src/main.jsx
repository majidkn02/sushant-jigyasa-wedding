import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/ornaments.css';
import './styles/opening.css';
import './styles/sections.css';
import './styles/media.css';
import './styles/interactions.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
