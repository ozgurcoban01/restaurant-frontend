import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import menuSlice from '../features/menuSlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    menu:menuSlice
   
  },
}) 