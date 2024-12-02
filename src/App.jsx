import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Componentes/Navbar';
import BatePapoPage from './pages/BatePapoPage';
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage';

const App = () => {
    // Verifica se há um usuário logado (usuarioAtivo será null se não houver usuário logado)
    const usuarioAtivo = useSelector(state => state.usuarios.usuarioAtivo);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
                {/* Verifica se existe um usuário logado para acessar o BatePapoPage */}
                <Route
                    path="/batepapo"
                    element={usuarioAtivo ? <BatePapoPage /> : <Navigate to="/login" replace />}
                />
                {/* Se tentar acessar qualquer outra rota que não seja login, cadastro ou batepapo, redireciona */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
