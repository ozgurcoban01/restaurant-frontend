import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardList: [],
  cardCount:0,
  cardPrice:0
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardList: (state, action) => {
        state.cardList = action.payload;
    },
    setCardCount: (state, action) => {
        state.cardCount = action.payload;
    },
    setCardPrice: (state, action) => {
        state.cardPrice = action.payload;
    },
  },
});

export const { setCardList,setCardCount,setCardPrice } = cardSlice.actions;
export default cardSlice.reducer;
