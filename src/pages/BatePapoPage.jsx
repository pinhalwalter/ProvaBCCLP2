import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/usuariosSlice';
import { adicionarMensagem, excluirMensagem } from '../features/mensagensSlice';  // Importa a ação para adicionar e excluir mensagem
import { Navigate } from 'react-router-dom';

const BatePapoPage = () => {
    const dispatch = useDispatch();
    const usuarioAtivo = useSelector(state => state.usuarios.usuarioAtivo);
    const mensagens = useSelector(state => state.mensagens.mensagens);  // Acessa as mensagens no Redux

    const [novaMensagem, setNovaMensagem] = useState('');  // Estado para armazenar a nova mensagem

    // Função para deslogar
    const handleLogout = () => {
        dispatch(logout()); // Despacha a ação de logout para limpar o estado do usuário
    };

    // Função para enviar uma nova mensagem
    const handleEnviarMensagem = () => {
        if (novaMensagem.trim() !== '') {
            const mensagem = {
                id: Date.now(),  // Gera um ID único para cada mensagem
                autor: usuarioAtivo.nickname,  // Usando nickname do usuário ativo
                avatarUrl: usuarioAtivo.avatarUrl,  // Usando avatarUrl do usuário ativo
                conteudo: novaMensagem,
                data: new Date().toLocaleString(),
                timestamp: new Date().getTime(),  // Armazena o timestamp da mensagem
            };

            // Despacha a ação de adicionar mensagem no Redux
            dispatch(adicionarMensagem(mensagem));
            setNovaMensagem('');  // Limpa o campo de nova mensagem após o envio
        }
    };

    // Função para excluir uma mensagem específica
    const handleExcluirMensagem = (id) => {
        const mensagem = mensagens.find(msg => msg.id === id);
        if (mensagem) {
            const tempoDecorrido = (new Date().getTime() - mensagem.timestamp) / 1000 / 60;  // Tempo em minutos
            if (tempoDecorrido <= 5 && mensagem.autor === usuarioAtivo.nickname) {
                dispatch(excluirMensagem(id));  // Exclui a mensagem com o id correspondente
            } else {
                alert("Você só pode excluir mensagens enviadas nos últimos 5 minutos.");
            }
        }
    };

    // Se não houver um usuário ativo, redireciona para a página de login
    if (!usuarioAtivo) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h2>Bate-papo</h2>
            <p>Bem-vindo, {usuarioAtivo.nickname}!</p>  {/* Exibe o nickname do usuário logado */}
            
            {/* Botão de logout */}
            <button onClick={handleLogout}>Sair</button>
            
            <div>
                <h3>Mensagens:</h3>
                <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                    {/* Exibe todas as mensagens */}
                    {mensagens.length > 0 ? (
                        mensagens.map((msg, index) => (
                            <div key={msg.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                                {/* Exibe a imagem do avatar */}
                                <img
                                    src={msg.avatarUrl}
                                    alt={msg.autor}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                />
                                <div>
                                    {/* Exibe o nickname e a data */}
                                    <strong>{msg.autor}</strong> ({msg.data}):
                                    <p>{msg.conteudo}</p>
                                    
                                    {/* Exibe o botão de exclusão para a mensagem do autor */}
                                    {msg.autor === usuarioAtivo.nickname && (
                                        <button onClick={() => handleExcluirMensagem(msg.id)}>Excluir</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Não há mensagens ainda.</p>
                    )}
                </div>
            </div>
            
            {/* Campo para digitar uma nova mensagem */}
            <textarea
                placeholder="Digite sua mensagem..."
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                style={{ width: '100%', height: '100px', marginTop: '20px' }}
            />
            <button onClick={handleEnviarMensagem}>Enviar</button>
        </div>
    );
};

export default BatePapoPage;
