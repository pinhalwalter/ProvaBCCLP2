import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/usuariosSlice';  // Ação de login

const LoginPage = () => {
    const dispatch = useDispatch();
    const usuarios = useSelector(state => state.usuarios.lista);  // Lista de usuários do Redux
    const [nickname, setNickname] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');  // Para exibir mensagens de erro

    const handleLogin = () => {
        // Verifica se todos os campos foram preenchidos
        if (!nickname || !senha) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        // Verifica se o usuário existe na lista de usuários cadastrados
        const usuario = usuarios.find(user => user.nickname === nickname && user.senha === senha);

        if (usuario) {
            // Se o usuário for encontrado, despacha a ação de login
            dispatch(login(usuario));  // Atualiza o estado com o usuário logado
            setErro('');
            alert('Login bem-sucedido!');
        } else {
            // Se as credenciais forem inválidas
            setErro('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}  {/* Exibe erro se houver */}

            <div>
                <p>Não tem uma conta? <a href="/cadastro">Cadastre-se aqui</a></p>
            </div>
        </div>
    );
};

export default LoginPage;
