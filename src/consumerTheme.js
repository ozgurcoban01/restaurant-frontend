import { createTheme } from "@mui/material";
import { lime, purple,red,green,orange,deepOrange,deepPurple } from '@mui/material/colors';

export const consumerTheme = createTheme({
    palette: {
      primary: deepPurple,
      secondary: orange,
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: purple[900],
     
          },
        },
      },
    },
  });
