import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    characters: [],
    comics: [],
    series: []
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const { item, type } = action.payload;
            if (!state[type].some((fav) => fav.id === item.id)) {
                state[type].push(item);
            }
        },
        removeFromFavorites: (state, action) => {
            const { id, type } = action.payload;
            state[type] = state[type].filter((item) => item.id !== id);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;