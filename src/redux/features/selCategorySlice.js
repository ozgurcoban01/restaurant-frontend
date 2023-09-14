import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selCategory: "all",
};

export const selCategorySlice = createSlice({
  name: "selCategory",
  initialState,
  reducers: {
    setSelCategory: (state, action) => {
      state.selCategory = action.payload;
    },
  },
});

export const { setSelCategory } = selCategorySlice.actions;
export default selCategorySlice.reducer;
