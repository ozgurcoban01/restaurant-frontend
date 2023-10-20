import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:false
};

export const passScanQrSlice = createSlice({
  name: "passScanQr",
  initialState,
  reducers: {
    setPassScanQr: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setPassScanQr } = passScanQrSlice.actions;
export default passScanQrSlice.reducer;
