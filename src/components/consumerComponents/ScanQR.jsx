import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Box, Container } from "@mui/material";
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

const ScanQR = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState();
  const [fetchMenu, setFetchMenu] = useState();
  const [fetchImages, setFetchImages] = useState();
  const [navigatePage, setNavigatePage] = useState(false);

  const allImages = useSelector((state) => state.images);
  const allMenus = useSelector((state) => state.menu);
  const allCategories = useSelector((state) => state.categories);

  const fetchImagesFunc = async () => {
    const response = await axios(
      `https://pleasant-gloves-deer.cyclic.cloud/image/getAll`
    )
      .then((res) => res.data)
      .then((data) => dispatch(setImages(data)))
      .then(() => {
        setFetchMenu(true);
      });

    return;
  };

  const fetchMenuFunc = () => {
    const categoryList = [];

    allMenus.menu.forEach((menu) => {
      const pas = categoryList.includes(menu.category);

      if (!pas) {
        categoryList.push(menu.category);
      }
    });
    dispatch(setCategories(categoryList));
  
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

  if (navigatePage) {
    dispatch(setTableId(scanResult));
    navigate(`/consumer/enterName`);
  } else {
    scanResultDiv = <div id="reader"></div>;
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
