import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlise';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});