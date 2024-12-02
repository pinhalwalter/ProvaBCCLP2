import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adicionarUsuario } from '../features/usuariosSlice';  // Ação de adicionar usuário

const CadastroUsuario = () => {
    const dispatch = useDispatch();
    const usuarios = useSelector(state => state.usuarios.lista);  // Acessa a lista de usuários no Redux
    const [nickname, setNickname] = useState('');
    const [senha, setSenha] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');  // Para o URL do avatar
    const [erro, setErro] = useState('');  // Para mostrar erros de validação

    const handleCadastro = () => {
        // Verifica se todos os campos foram preenchidos
        if (!nickname || !senha || !avatarUrl) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }

        // Lógica para adicionar um novo usuário
        const novoUsuario = { nickname, senha, avatarUrl };

        // Chama a ação de adicionar o usuário ao Redux
        dispatch(adicionarUsuario(novoUsuario));

        // Limpa os campos de entrada
        setNickname('');
        setSenha('');
        setAvatarUrl('');
        setErro('');  // Limpa a mensagem de erro
        alert('Usuário cadastrado com sucesso!');
    };

    return (
        <div>
            <h2>Cadastro de Usuário</h2>
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
            <input
                type="text"
                placeholder="URL do Avatar"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
            />
            <button onClick={handleCadastro}>Cadastrar</button>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}  {/* Exibe erro se houver */}

            <h3>Usuários Cadastrados</h3>
            {/* Exibe a lista de usuários cadastrados */}
            {usuarios.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {usuarios.map((usuario, index) => (
                        <li key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                            {/* Exibe a imagem do avatar */}
                            <img
                                src={usuario.avatarUrl}
                                alt={usuario.nickname}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                            {/* Exibe o nickname */}
                            <span>{usuario.nickname}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há usuários cadastrados.</p>
            )}
        </div>
    );
};

export default CadastroUsuario;
