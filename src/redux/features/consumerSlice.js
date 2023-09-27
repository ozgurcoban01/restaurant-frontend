import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
};

export const consumerSlice = createSlice({
  name: "consumerName",
  initialState,
  reducers: {
    setConsumerNameRedux: (state, action) => {
      state.name = action.payload;
    },
    setConsumerIdRedux: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setConsumerNameRedux,setConsumerIdRedux } = consumerSlice.actions;
export default consumerSlice.reducer;
