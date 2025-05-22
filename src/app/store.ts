import { configureStore } from "@reduxjs/toolkit";
import { throttle } from "lodash";
import searchReducer from "../features/search/searchSlice";
import sortReducer from "../features/sort/sortSlice";
import listReducer from "../features/list/listSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import cartReducer from "../features/cart/cartSlice";
import { loadState, saveState } from "./localStorageUtils";

const preloadedState = {
  favorites: loadState("favorites") || { items: [] },
  cart: loadState("cart") || { items: [] },
};

export const store = configureStore({
  reducer: {
    list: listReducer,
    search: searchReducer,
    sort: sortReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(
  throttle(() => {
    const { favorites, cart } = store.getState();
    saveState("favorites", favorites);
    saveState("cart", cart);
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
