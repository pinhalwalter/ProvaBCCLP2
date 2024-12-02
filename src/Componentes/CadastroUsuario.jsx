import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adicionarUsuario, editarUsuario, removerUsuario } from '../features/usuariosSlice';

const CadastroUsuarios = () => {
    const usuarios = useSelector(state => state.usuarios);
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [senha, setSenha] = useState('');
    const [idEdicao, setIdEdicao] = useState(null);

    const handleSubmit = () => {
        if (idEdicao) {
            dispatch(editarUsuario({ id: idEdicao, nickname, avatar, senha }));
        } else {
            dispatch(adicionarUsuario({ id: Date.now(), nickname, avatar, senha }));
        }
        setNickname('');
        setAvatar('');
        setSenha('');
        setIdEdicao(null);
    };

    const handleEdit = usuario => {
        setNickname(usuario.nickname);
        setAvatar(usuario.avatar);
        setSenha(usuario.senha);
        setIdEdicao(usuario.id);
    };

    return (
        <div>
            <h2>Cadastro de Usuários</h2>
            <form>
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Avatar URL"
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                />
                <button type="button" onClick={handleSubmit}>
                    {idEdicao ? 'Salvar Alterações' : 'Cadastrar'}
                </button>
            </form>
            <ul>
                {usuarios.map(user => (
                    <li key={user.id}>
                        <img src={user.avatar} alt={user.nickname} width={50} />
                        {user.nickname}
                        <button onClick={() => handleEdit(user)}>Editar</button>
                        <button onClick={() => dispatch(removerUsuario(user.id))}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CadastroUsuarios;
