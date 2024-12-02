import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adicionarMensagem, removerMensagem } from '../features/mensagensSlice';

const BatePapo = () => {
    const mensagens = useSelector(state => state.mensagens);
    const usuarioAtivo = useSelector(state => state.usuarios.usuarioAtivo);
    const [conteudo, setConteudo] = useState('');
    const dispatch = useDispatch();

    const handleEnviar = () => {
        if (conteudo.trim()) {
            dispatch(adicionarMensagem({
                id: Date.now(),
                conteudo,
                autor: usuarioAtivo.nickname,
                lida: false,
                timestamp: new Date().toISOString()
            }));
            setConteudo('');
        }
    };

    const handleRemover = (id, autor) => {
        if (autor === usuarioAtivo.nickname) {
            dispatch(removerMensagem(id));
        } else {
            alert('Você só pode remover suas próprias mensagens!');
        }
    };

    return (
        <div>
            <h2>Bate-papo</h2>
            <ul>
                {mensagens.map(msg => (
                    <li key={msg.id}>
                        <strong>{msg.autor}</strong>: {msg.conteudo}
                        <button onClick={() => handleRemover(msg.id, msg.autor)}>Remover</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={conteudo}
                    onChange={e => setConteudo(e.target.value)}
                    placeholder="Digite sua mensagem"
                />
                <button onClick={handleEnviar}>Enviar</button>
            </div>
        </div>
    );
};

export default BatePapo;
