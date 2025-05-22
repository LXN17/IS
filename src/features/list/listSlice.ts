import { createSlice } from "@reduxjs/toolkit";

export interface ListSlice {
  value: any[];
}

const initialState: ListSlice = {
  value: [],
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.value = action.payload;
    },
    addItem: (state, action) => {
      state.value.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setList, addItem, deleteItem } = listSlice.actions;

export default listSlice.reducer;
