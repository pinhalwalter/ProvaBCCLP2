import { createSlice } from '@reduxjs/toolkit';

const mensagensSlice = createSlice({
    name: 'mensagens',
    initialState: [],
    reducers: {
        adicionarMensagem(state, action) {
            state.push(action.payload);
        },
        alterarStatusMensagem(state, action) {
            const mensagem = state.find(msg => msg.id === action.payload.id);
            if (mensagem) {
                mensagem.lida = action.payload.lida;
            }
        },
        removerMensagem(state, action) {
            return state.filter(msg => msg.id !== action.payload);
        },
    },
});

export const { adicionarMensagem, alterarStatusMensagem, removerMensagem } = mensagensSlice.actions;
export default mensagensSlice.reducer;
