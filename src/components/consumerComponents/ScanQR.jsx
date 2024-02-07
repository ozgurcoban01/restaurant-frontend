import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Box, Button, Container, Typography, fabClasses } from "@mui/material";
import {
  lime,
  purple,
  red,
  green,
  orange,
  deepOrange,
  deepPurple,
} from "@mui/material/colors";
import "../../index.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTableId, setTableName } from "../../redux/features/tableSlice";
import axios from "axios";
import { setImages } from "../../redux/features/imagesSlice";
import { setCategories } from "../../redux/features/categorySlice";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RedoIcon from "@mui/icons-material/Redo";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { setOrder } from "../../redux/features/orderSlice";
import ReactJoyride from "react-joyride";
import { createTheme,ThemeProvider } from "@mui/material";
import { CssBaseline } from '@mui/material/';
import LinearProgress from '@mui/material/LinearProgress';
import { setPassScanQr } from "../../redux/features/passScanQrSlice";
import CircularWithValueLabel from "./CircularWithValueLabel";

const ScanQR = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [netError, setNetError] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [progressBuffer, setProgressBuffer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [apiurl, setApiurl] = useState(import.meta.env.VITE_API_URL);
  const [timeOut, setTimeOut] = useState();
  const [fetchMenu, setFetchMenu] = useState();
  const [fetchImages, setFetchImages] = useState();
  const [fetchCategory, setFetchCategory] = useState();
  const [newapiurl, setNewApiUrl] = useState();
  const [fetchTableName, setFetchTableName] = useState();
  const [fetchOrder, setFetchOrder] = useState();
  const [navigatePage, setNavigatePage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const allImages = useSelector((state) => state.images);
  const allMenus = useSelector((state) => state.menu);
  const allCategories = useSelector((state) => state.categories);
  const tableId = useSelector((state) => state.table.tableId);

  const options={
    onDownloadProgress:function(progressEvent){

      if(true){
        setProgress(progressEvent.progress*70)
      }

    }
  }

//fetching images
//1
const fetchImagesFunc = async () => {
  setProgressBuffer(10)
  const response = await axios(
    `${apiurl}/image/getAll`,options
  )
    .then((res) => res.data)
    .then((data) => dispatch(setImages(data)))
    .then(() => {
      setFetchTableName(true);
      setProgress(70)
      setProgressBuffer(70)
    }).catch((error)=>{
      console.log("hata")
      console.log(apiurl)
      setNetError(true)
      setLoading(false)
    });
  return;
};

  //2
  const fetchCategoryFunc = async () => {
    setProgressBuffer(85)
    const response = await axios(
      `${apiurl}/category/getAllCategory`
    )
      .then((res) => res.data)
      .then((data)=>{
        const tempCategories=[]
        if(data.length>0){
          data.forEach(element => {
            tempCategories.push(element.name)
          });
        }
        dispatch(setCategories(tempCategories))
      })
      .then(() => {
        setFetchImages(true);
        setProgress(75)
        setProgressBuffer(85)
      });
    return;
  };

   //3
   const fetchTableNameFunc = async () => {
    setProgressBuffer(90)
    const response = await axios.post(
      `${apiurl}/tables/getTable/${scanResult}`
    )
      .then((res) => res.data)
      .then((data)=>{
       // console.log(data.name)
        dispatch(setTableName(data.name))
      })
      .then(() => {
        setFetchOrder(true);
        setProgress(80)
        setProgressBuffer(90)
      });
    return;
  };

//4
  const fetchOrderFunc = async () => {
    setProgressBuffer(95)
    const response = await axios(
      `${apiurl}/order/getAllOrders`
    )
      .then((res) => res.data)
      .then((data)=>{
        dispatch(setOrder(data))
      })
      .then(() => {
        setFetchMenu(true);
        setProgress(90)
        setProgressBuffer(95)
      });
    return;
  };



  // FINAL FUNC
  const fetchMenuFunc = () => {
    setProgress(100)
    setProgressBuffer(100)
/*
    const categoryList = [];

    allMenus.menu.forEach((menu) => {
      const pas = categoryList.includes(menu.category);

      if (!pas) {
        categoryList.push(menu.category);
      }
    });
   */
    setTimeout(() => {
      setLoading(false);
      setNavigatePage(true);

    }, 500);
  };

  useEffect(() => {
    if (fetchImages != null) {
      fetchImagesFunc();
    }
  }, [fetchImages]);
  useEffect(() => {
    if (newapiurl != null&&newapiurl==true) {
      fetchImagesFunc()
    }
  }, [newapiurl]);

  useEffect(() => {
    if (fetchTableName != null) {
      fetchTableNameFunc();
    }
  }, [fetchTableName]);


  useEffect(() => {
    if (fetchMenu != null) {
      fetchMenuFunc();
    }
  }, [fetchMenu]);

  useEffect(() => {
    if (fetchOrder != null) {
      fetchOrderFunc();
    }
  }, [fetchOrder]);

  useEffect(() => {
    if (fetchCategory != null) {
      fetchCategoryFunc();
    }
  }, [fetchCategory]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 20,
    });

    const success = (result) => {
      console.log(result)
      setScanResult(result);
      setLoading(true);
      setFetchCategory(true);
      scanner.clear();
    };

    const error = (err) => {
      console.warn(err);
    };

    scanner.render(success, error);

    if (!scanResult) {
      const button = document.querySelector(
        "#html5-qrcode-button-camera-permission"
      );
      const buttonText = document.querySelector(
        "#html5-qrcode-button-file-selection"
      );
      const frame = document.querySelector("#reader");
      const scanFile = document.querySelector(
        "#html5-qrcode-anchor-scan-type-change"
      );

      const scanFileText = document.querySelector(
        "#reader__dashboard_section > div:nth-child(1) > div:nth-child(2) > div"
      );

      // scanFile.innerHTML=""
      scanFile.style["text-decoration"] = "none";
      scanFile.style["color"] = deepPurple[300];
      scanFile.style["font-family"] =
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

      scanFileText.style["text-decoration"] = "none";
      scanFileText.style["color"] = deepPurple[900];
      scanFileText.style["font-family"] =
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

      buttonText.style["background-color"] = deepPurple[600];
      buttonText.style["border"] = "none";
      buttonText.style["padding"] = "10px";
      buttonText.style["border-radius"] = "10px";
      buttonText.style["cursor"] = "pointer";

      button.style["background-color"] = deepPurple[600];
      button.style["border"] = "none";
      button.style["padding"] = "10px";
      button.style["border-radius"] = "10px";
      button.style["cursor"] = "pointer";

      frame.style["border"] = "none";
    }
  }, []);

  let scanResultDiv;

  const skipToEnterName = () => {
    setScanResult("65c3a9fe1a8d41e4f752a2b7");
    setLoading(true);
    setFetchCategory(true);
  };

  const changeApiUrl = () => {
    setApiurl(import.meta.env.VITE_API_URL2)
    setNetError(false)
    setLoading(true)
    setNewApiUrl(true)
  };

  const skipToAdmin = () => {
    setScanResult("65c3a9fe1a8d41e4f752a2b7");
    setIsAdmin(true)
    setLoading(true);
    setFetchCategory(true);
  };

  if (navigatePage) {
    dispatch(setTableId(scanResult));

    if(isAdmin){
      navigate(`/kitchen/admin`);
 
    }else{
      navigate(`/consumer/enterName`);
      
    }
  
  } else {
    scanResultDiv = (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",

        }}
      >
        <div id="reader" className="scan-qr"></div>{" "}
        <Button
          onClick={skipToEnterName}
          endIcon={<RedoIcon />}
          variant="contained"
          size="small"
          color="error"
          sx={{mt:1}}
          className="skip-qr"
        >
          QR Taramayı Atla
        </Button>
        <Button
          onClick={skipToAdmin}
          endIcon={<AdminPanelSettingsIcon />}
          variant="contained"
          size="small"
          color="warning"
          sx={{mt:1}}
          className="admin-panel"
        >
          Admin Girişi
        </Button>
      </Box>
    );
  }

  const loadingPage = (
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
     <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress  />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          m:1,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" sx={{fontWeight:900,fontSize:10,color:deepPurple[900]}} >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>

    <LinearProgress sx={{color:deepPurple[500],fill:deepPurple[900],border:"3px solid",borderColor:deepPurple[500],borderRadius:"50px",p:1,pl:0,m:1,maxWidth:"200px",width:"80vw"}} variant="buffer" value={progress} valueBuffer={progressBuffer} />
    <Box sx={{color:deepPurple[900],fontWeight:900,m:1,textAlign:"center"}}>BİRAZ VAKİT ALABİLİR, BU EKRANA GELDİYSENİZ VE ÇOK UZUN SÜRDÜYSE SAYFAYI YENİLEYEBİLİRSİNİZ
 
          
          </Box>   
    </Box>
  );

  return (
    <div >
{netError ? <Box  sx={{ backgroundColor:deepPurple[50], color:"red"}}>
        <Container
          sx={{
           
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
             }}
        >
          <Box sx={{color:deepPurple[900],fontWeight:900}}>ŞU ANDA KULLANDIĞIM SERVİS ÇALIŞMIYOR, DİĞER SERVİSİ KULLANMAK İÇİN TIKLAYIN 
          
          </Box>    
          <Button
          onClick={changeApiUrl}
          endIcon={<SkipNextIcon />}
          variant="contained"
          size="small"
          color="primary"
          sx={{mt:1}}
          className="admin-panel"
        >
          BAĞLANTIYI DEĞİŞTİR
        </Button>
        </Container>
      </Box> : <Box  sx={{ backgroundColor:deepPurple[50], color:"red"}}>
        <Container
          sx={{
           
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
             }}
        >
          {loading ? loadingPage : scanResultDiv}       
        </Container>
      </Box>}  
      
    </div>
  );
};
2;
export default ScanQR;
