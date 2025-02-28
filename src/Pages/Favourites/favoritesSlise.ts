import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersType, ComicsType, SeriesType } from '../Types/types';

interface FavoritesState {
  characters: CharactersType[]
  comics: ComicsType[]
  series: SeriesType[]
}

const initialState: FavoritesState = {
  characters: [],
  comics: [],
  series: []
};

type FavoritesCategory = keyof FavoritesState;

type AddToFavoritesPayload =
  | { type: 'characters'; item: CharactersType }
  | { type: 'comics'; item: ComicsType }
  | { type: 'series'; item: SeriesType };

interface RemoveFromFavoritesPayload {
  id: number;
  type: FavoritesCategory;
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<AddToFavoritesPayload>) => {
      const { type, item } = action.payload;
      if (!state[type].some(fav => fav.id === item.id)) {
        (state[type] as any[]).push(item)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<RemoveFromFavoritesPayload>) => {
      const { type, id } = action.payload;
      state[type] = state[type].filter(item => item.id !== id) as any;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;