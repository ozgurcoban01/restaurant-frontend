import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const tableSlice = createSlice({
  name: "tableId",
  initialState,
  reducers: {
    setTableId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTableId } = tableSlice.actions;
export default tableSlice.reducer;
