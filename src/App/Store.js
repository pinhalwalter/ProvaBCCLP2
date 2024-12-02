import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from '../features/usuariosSlice';
import mensagensReducer from '../features/mensagensSlice';

const store = configureStore({
    reducer: {
        usuarios: usuariosReducer,
        mensagens: mensagensReducer,
    },
});

export default store;
