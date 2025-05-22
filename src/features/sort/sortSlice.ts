import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SortSlice {
  value: "title" | "priceASC" | "priceDESC";
}

const initialState: SortSlice = {
  value: "title",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;
