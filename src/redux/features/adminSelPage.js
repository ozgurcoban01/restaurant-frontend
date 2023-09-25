import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState={
    page:"Menü Ekle",
}


export const adminSelPage=createSlice({
     name:'AdminPage',
     initialState,
     reducers:{
      setAdminPage: (state,action) => {
        state.page = action.payload;
      },
    }
})

export const { setAdminPage } = adminSelPage.actions;
export default adminSelPage.reducer