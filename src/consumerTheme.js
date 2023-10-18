import { createTheme } from "@mui/material";
import { lime, purple,red,green,orange,deepOrange,deepPurple } from '@mui/material/colors';
import { useSelector } from "react-redux";


export const consumerTheme= createTheme({
    palette: {
      primary: {
        main: green[500],
        light: green[200],
        dark: green[900],
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
            backgroundColor: green,
     
          },
        },
      },
    },
    
  });
