import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setDrawer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
