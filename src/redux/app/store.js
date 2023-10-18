import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import menuSlice from '../features/menuSlice'
import tableSlice from '../features/tableSlice'
import consumerSlice from '../features/consumerSlice'
import drawerSlice from '../features/drawerSlice'
import imagesSlice from '../features/imagesSlice'
import categorySlice from '../features/categorySlice'
import selCategorySlice from '../features/selCategorySlice'
import cardSlice from '../features/cardSlice'
import adminSelPage from '../features/adminSelPage'
import orderSlice from '../features/orderSlice'
import colorSlice from '../features/colorSlice'

export const store = configureStore({
  reducer: {
    counter:counterSlice,
    images:imagesSlice,
    menu:menuSlice,
    table:tableSlice,
    consumer:consumerSlice,
    drawer:drawerSlice,
    categories:categorySlice,
    selCategory:selCategorySlice,
    card:cardSlice,
    adminPage:adminSelPage,
    order:orderSlice,
    themeColor:colorSlice,
  },
}) 