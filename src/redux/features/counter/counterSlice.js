import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  getData:[],
  loading:true

}

export const fetchData = createAsyncThunk(
    'getData',
    async () => {
      const response = await fetch(`https://pleasant-gloves-deer.cyclic.cloud/menu/getAllMenu`)

      return (await response.json())
    }
  )

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchData.fulfilled,(state, action)=>{
        state.getData=action.payload
        state.loading=false
    })
 },
})


export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer