import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Box, Button, Container, fabClasses } from "@mui/material";
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
import { setTableId } from "../../redux/features/tableSlice";
import axios from "axios";
import { setImages } from "../../redux/features/imagesSlice";
import { setCategories } from "../../redux/features/categorySlice";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RedoIcon from "@mui/icons-material/Redo";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const ScanQR = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState();
  const [fetchMenu, setFetchMenu] = useState();
  const [fetchImages, setFetchImages] = useState();
  const [fetchCategory, setFetchCategory] = useState();
  const [navigatePage, setNavigatePage] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const allImages = useSelector((state) => state.images);
  const allMenus = useSelector((state) => state.menu);
  const allCategories = useSelector((state) => state.categories);

  const fetchCategoryFunc = async () => {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/category/getAllCategory`
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
        setFetchMenu(true);
      });
    return;
  };


  const fetchImagesFunc = async () => {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/image/getAll`
    )
      .then((res) => res.data)
      .then((data) => dispatch(setImages(data)))
      .then(() => {
        setFetchCategory(true);
      });
    return;
  };

  const fetchMenuFunc = () => {
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
    }, 2000);
  };

  useEffect(() => {
    if (fetchImages != null) {
      fetchImagesFunc();
    }
  }, [fetchImages]);

  useEffect(() => {
    if (fetchMenu != null) {
      fetchMenuFunc();
    }
  }, [fetchMenu]);

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
      setLoading(true);
      setFetchImages(true);
      setScanResult(result);
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
    setLoading(true);
    setFetchImages(true);
    setScanResult("DEMO_TABLE_ID");
  };
  const skipToAdmin = () => {

    setIsAdmin(true)
    setLoading(true);
    setFetchImages(true);
    setScanResult("DEMO_TABLE_ID");
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
        <div id="reader"></div>{" "}
        <Button
          onClick={skipToEnterName}
          endIcon={<RedoIcon />}
          variant="contained"
          size="small"
          color="error"
          sx={{mt:1}}
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
        >
          Admin Girişi
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ backgroundColor: deepPurple[100] }}>
        <Container
          sx={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {loading ? <CircularProgress /> : scanResultDiv}
        </Container>
      </Box>
    </div>
  );
};
2;
export default ScanQR;
