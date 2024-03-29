import { useEffect, useState } from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { createTheme } from "@mui/material";
import { fetchMenu } from "./redux/features/menuSlice";
import { Route, Routes } from "react-router-dom";

import Consumer from "./components/Consumer";
import EnterName from "./components/consumerComponents/EnterName";
import ConsumerSelect from "./components/consumerComponents/ConsumerSelect";
import ScanQR from "./components/consumerComponents/ScanQR";
import Test from "./components/kitchenComponents/Test";
import ConsumerMenuK from "./components/kitchenComponents/ConsumerMenu";
import ConsumerDrawer from "./components/consumerComponents/ConsumerDrawer";
import ConsumerMenu from "./components/consumerComponents/ConsumerMenu";
import AdminPanel from "./components/kitchenComponents/AdminPanel";
import ReactJoyride from "react-joyride";
import "./components/init"
import { CssBaseline } from '@mui/material/';
import { consumerTheme } from "./consumerTheme";
import { ThemeProvider } from "@emotion/react";
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { lime, purple,red,green,orange,deepOrange,deepPurple,lightBlue,brown } from '@mui/material/colors';
import { setThemeColor } from "./redux/features/colorSlice";


import ColorLensIcon from '@mui/icons-material/ColorLens';



function App() {


  const themMain=500
  const themLight=50
  const themDark=900
 
  const passScanQr=useSelector((state)=>state.passScanQr.value)
  const dispatch=useDispatch()
  const redTheme= createTheme({
    palette: {
      primary: {
        main: red[themMain],
        light: red[themLight],
        dark: red[themDark],
      },
      secondary: {
        main: red[themMain],
        light: red[themLight],
        dark: red[themDark],
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: red,
     
          },
        },
      },
    },
    
  });
  const purpleTheme= createTheme({
    palette: {
      primary: {
        main: deepPurple[themMain],
        light: deepPurple[themLight],
        dark: deepPurple[themDark],
      },
      secondary: {
        main: red[themMain],
        light: red[themLight],
        dark: red[themDark],
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: deepPurple,
     
          },
        },
      },
    },
    
  });
  const orangeTheme= createTheme({
    palette: {
      primary: {
        main: orange[themMain],
        light: orange[themLight],
        dark: orange[themDark],
      },
      secondary: {
        main: red[themMain],
        light: red[themLight],
        dark: red[themDark],
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
  const greenTheme= createTheme({
    palette: {
      primary: {
        main: green[themMain],
        light: green[themLight],
        dark: green[themDark],
      },
      secondary: {
        main: red[themMain],
        light: red[themLight],
        dark: red[themDark],
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
  const lightBlueTheme= createTheme({
    palette: {
      primary: {
        main: lightBlue[themMain],
        light: lightBlue[themLight],
        dark: lightBlue[themDark],
      },
      secondary: {
        main: red[themMain],
        light: red[themLight],
        dark: red[themDark],
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: lightBlue,
     
          },
        },
      },
    },
    
  });
  const brownTheme= createTheme({
    palette: {
      primary: {
        main: brown[themMain],
        light: brown[themLight],
        dark: brown[themDark],
      },
      secondary: {
        main: red[themMain],
        light: red[themLight],
        dark: red[themDark],
      },
    },
    components: {
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: brown,
     
          },
        },
      },
    },
    
  });
  
  const [selectedTheme,setSelectedTheme]=useState(purpleTheme)
  
  const steps=[
    {
      target:'.scan-qr',
      disableBeacon: true,
      content:'Bu alandan QR Kodu tarayıp müşteri olarak giriş yapabilirsiniz'
    },
    {
      target:'.skip-qr',
      
      content:'Bu alandan ise QR Kod Taramadan giriş yapabilirsiniz'
    },
    {
      target:'.admin-panel',
      
      content:'Dilerseniz doğrudan admin paneline geçebilirisiniz'
    }
  ]

  const counter = useSelector((state) => state.counter.value);
  const menu = useSelector((state) => state.menu.menu);


  const actions = [
    { icon: <FormatColorFillIcon sx={{fill:"purple"}}/>, theme:purpleTheme },
    { icon: <FormatColorFillIcon sx={{fill:"red"}}/>,  theme:redTheme },
    { icon: <FormatColorFillIcon sx={{fill:"green"}}/>,  theme:greenTheme  },
    { icon: <FormatColorFillIcon sx={{fill:"orange"}}/>,  theme:orangeTheme  },
    { icon: <FormatColorFillIcon sx={{fill:"lightBlue"}}/>,  theme:lightBlueTheme  },
    { icon: <FormatColorFillIcon sx={{fill:"brown"}}/>,  theme:brownTheme  },
  ];
  useEffect(() => {
    dispatch(fetchMenu());
  }, []);



  useEffect[()=>{
   
  },[]]

const setColor=(e)=>{
  setSelectedTheme(e.theme)

}

  return (
    <>
    <div style={{position:"absolute",backgroundColor:"black",color:"white",borderRadius:"10px",padding:"5px",margin:"10px",fontWeight:"bold",opacity:"0.5"}}>v0.8.2</div>
        <ReactJoyride steps={steps} locale={{ back: 'Geri  ', close: 'Kapat', last: 'SON', next: 'İleri', open: 'Aç', skip: 'Atla' }} continuous={true}/>
      <ThemeProvider theme={selectedTheme}> 
      <CssBaseline/>
        <Routes>
          <Route path="consumer" >
            <Route path="scanQR" element={<ScanQR />} />
            <Route path="menu/:consumerId" element={<ConsumerMenu />} />
            <Route path="enterName" element={<EnterName />} />
            <Route path="consumerSelect/:consumerId" element={<ConsumerSelect />} />
          </Route>
          <Route path="kitchen" >
            <Route path="admin" element={<AdminPanel />} />
            <Route path="test" element={<Test />} />
            <Route path="menu" element={<ConsumerDrawer />} />
         </Route>
        </Routes>
        

        <SpeedDial
        
        ariaLabel="SpeedDial basic example"
        sx={{ position:'absolute',bottom:16,right:16,display:(passScanQr?"flex":"none")}}
        icon={<ColorLensIcon  />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={()=>{setColor(action)}}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>  
      </ThemeProvider>
    </>
  );
}

export default App;
