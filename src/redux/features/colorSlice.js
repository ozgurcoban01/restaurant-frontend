import { createSlice } from "@reduxjs/toolkit";
import { createTheme } from "@mui/material";
import { lime, purple,red,green,orange,deepOrange,deepPurple } from '@mui/material/colors';

const greenTheme= createTheme({
    palette: {
      primary: {
        main: orange[500],
        light: orange[200],
        dark: orange[900],
      },
      secondary: {
        main: red[500],
        light: red[200],
        dark: red[900],
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: orange,
     
          },
        },
      },
    },
    
  });


const initialState = {
  theme: greenTheme,
};

export const colorSlice = createSlice({
  name: "selectedColor",
  initialState,
  reducers: {
    setThemeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const {setThemeColor} = colorSlice.actions;
export default colorSlice.reducer;
