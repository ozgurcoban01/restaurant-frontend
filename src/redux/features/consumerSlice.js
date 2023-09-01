import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const consumerSlice = createSlice({
  name: "consumerName",
  initialState,
  reducers: {
    setConsumerNameRedux: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setConsumerNameRedux } = consumerSlice.actions;
export default consumerSlice.reducer;
