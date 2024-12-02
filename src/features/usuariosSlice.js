import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usuarioAtivo: null,
    lista: [
        { nickname: 'joao123', senha: '1234', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { nickname: 'maria456', senha: 'abcd', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    ],
};

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
        // Ação para login
        login(state, action) {
            state.usuarioAtivo = action.payload;
        },
        // Ação para logout
        logout(state) {
            state.usuarioAtivo = null;
        },
        // Ação para adicionar um novo usuário
        adicionarUsuario(state, action) {
            state.lista.push(action.payload);  // Adiciona o novo usuário à lista
        },
    },
});

export const { login, logout, adicionarUsuario } = usuariosSlice.actions;
export default usuariosSlice.reducer;
