import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BatePapoPage from './pages/BatePapoPage';
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/cadastro" element={<CadastroPage />} />
                <Route path="/batepapo" element={<BatePapoPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
