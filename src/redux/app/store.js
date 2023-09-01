import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import menuSlice from '../features/menuSlice'
import tableSlice from '../features/tableSlice'
import consumerSlice from '../features/consumerSlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    menu:menuSlice,
    tableId:tableSlice,
    consumerName:consumerSlice
  },
}) 