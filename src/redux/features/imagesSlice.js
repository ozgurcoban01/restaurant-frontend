import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState={
   
    images:[],
}


export const imagesSlice=createSlice({
     name:'images',
     initialState,
     reducers:{
      setImages: (state,action) => {
        state.images = action.payload;
      },
    }
})

export const { setImages } = imagesSlice.actions;
export default imagesSlice.reducer