import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
const initialState={
   
    menu:[]
}

export const fetchMenu = createAsyncThunk(
    '',
    async () => {
      const response = await axios(`https://pleasant-gloves-deer.cyclic.cloud/menu/getAllMenu`)

      return (await response.data)
    }
  )

export const menuSlice=createSlice({
     name:'menu',
     initialState,
     reducers:{
      decrement: (state) => {
        state.value=[null]
      },
    },
     extraReducers:(builder)=>{
        builder.addCase(fetchMenu.fulfilled,(state, action)=>{
            state.menu=action.payload
        })
     },
})

export default menuSlice.reducer