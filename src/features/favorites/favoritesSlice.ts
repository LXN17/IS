import { createSlice } from "@reduxjs/toolkit";

interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
