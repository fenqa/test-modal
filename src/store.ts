import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './components/Modal/modalSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
