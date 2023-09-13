import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState={
   
    categories:[],
}


export const categorySlice=createSlice({
     name:'categories',
     initialState,
     reducers:{
      setCategories: (state,action) => {
        state.categories = action.payload;
      },
    }
})

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer