import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mensagens: [],
};

const mensagensSlice = createSlice({
    name: 'mensagens',
    initialState,
    reducers: {
        adicionarMensagem(state, action) {
            // Adiciona uma nova mensagem à lista
            state.mensagens.push({
                ...action.payload,
                timestamp: new Date().getTime(),  // Armazena o timestamp da mensagem
            });
        },
        excluirMensagem(state, action) {
            // Filtra a mensagem a ser excluída
            state.mensagens = state.mensagens.filter(msg => msg.id !== action.payload);
        }
    },
});

export const { adicionarMensagem, excluirMensagem } = mensagensSlice.actions;
export default mensagensSlice.reducer;
