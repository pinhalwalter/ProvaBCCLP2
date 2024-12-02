import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/usuariosSlice';

const Login = () => {
    const usuarios = useSelector(state => state.usuarios.lista);
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        const usuario = usuarios.find(user => user.nickname === nickname && user.senha === senha);
        if (usuario) {
            dispatch(login(usuario));
            alert('Login bem-sucedido!');
        } else {
            alert('Credenciais inválidas!');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
};

export default Login;
