import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import menuSlice from '../features/menuSlice'
import tableSlice from '../features/tableSlice'
import consumerSlice from '../features/consumerSlice'
import drawerSlice from '../features/drawerSlice'
import imagesSlice from '../features/imagesSlice'
import categorySlice from '../features/categorySlice'
import selCategorySlice from '../features/selCategorySlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    images:imagesSlice,
    menu:menuSlice,
    tableId:tableSlice,
    consumerName:consumerSlice,
    drawer:drawerSlice,
    categories:categorySlice,
    selCategory:selCategorySlice
    
  },
}) 