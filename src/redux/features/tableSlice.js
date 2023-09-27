import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
};

export const tableSlice = createSlice({
  name: "tableId",
  initialState,
  reducers: {
    setTableId: (state, action) => {
      state.id = action.payload;
    },
    setTableName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setTableId,setTableName } = tableSlice.actions;
export default tableSlice.reducer;
