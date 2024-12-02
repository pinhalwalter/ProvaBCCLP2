import { createSlice } from '@reduxjs/toolkit';

const usuariosSlice = createSlice({
    name: 'usuarios',
    initialState: [],
    reducers: {
        adicionarUsuario(state, action) {
            state.push(action.payload);
        },
        editarUsuario(state, action) {
            const { id, nickname, avatar, senha } = action.payload;
            const usuario = state.find(user => user.id === id);
            if (usuario) {
                usuario.nickname = nickname;
                usuario.avatar = avatar;
                usuario.senha = senha;
            }
        },
        removerUsuario(state, action) {
            return state.filter(user => user.id !== action.payload);
        },
    },
});

export const { adicionarUsuario, editarUsuario, removerUsuario } = usuariosSlice.actions;
export default usuariosSlice.reducer;
