import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "./styles/pages/car-detail-page.css";
import "./styles/pages/search-results-page.css";
import './styles/base.css';
import './styles/layout/navbar.css';
import './styles/sections/hero.css';
import './styles/sections/search.css';
import './styles/sections/car-section.css';
import './styles/sections/brand-section.css';
import './styles/pages/blank-page.css';
import './styles/responsive.css';
import "./styles/pages/rent-cars-page.css";
import './styles/pages/login-page.css';
import "./styles/pages/consignment-page.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);