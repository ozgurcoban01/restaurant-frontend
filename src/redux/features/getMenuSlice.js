import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
const initialState={
   
    menu:[]
}

export const fetchMenu = createAsyncThunk(
    'getMenuData',
    async () => {
      const response = await fetch(`https://pleasant-gloves-deer.cyclic.cloud/menu/getAllMenu`)

      return (await response)
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
            state.getMenuData=action.payload
        })
     },
})
export const { decrement} = menuSlice.actions

export default menuSlice.reducer