import React, { useEffect, useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Box, Container, Divider, Stack, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import axios from "axios";
import {
  lime,
  purple,
  red,
  green,
  orange,
  deepOrange,
  deepPurple,
} from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setConsumerIdRedux, setConsumerNameRedux } from "../../redux/features/consumerSlice";
import { setPassScanQr } from "../../redux/features/passScanQrSlice";



const EnterName = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const tableId = useSelector((state) => state.tableId);
  const cat = useSelector((state) => state.categories.categories);

  const [loading, setLoading] = useState(false);
  const [consumerName, setConsumerName] = useState("");

  function handleClick() {
   
    
    setLoading(true);
  }

  useEffect(() => {
    if (loading) {
    
      const consumer = {
        name: consumerName,
      };

      const goToMenu = (consumer) => {
        dispatch(setConsumerNameRedux(consumer.name))
        dispatch(setConsumerIdRedux(consumer._id))
        navigate(`/consumer/menu/${consumer._id}`);
        dispatch(setPassScanQr(true))
      };

      const fetchData = async () => {
        const consumerData = await axios
          .post(
            `${import.meta.env.VITE_API_URL}/consumer/createNewConsumer`,
            consumer
          )
          .then((res) => res.data).then((res)=>{setTimeout(goToMenu(res), 2000);});

        
      };
      fetchData();
    }
  }, [loading]);

  const textRef = useRef();

  const [textError, setTextError] = useState(false);

  const checkText = () => {
    const div = textRef.current;
    const innerText = div.children[1].children[0].value;

    if (innerText) {
      setTextError(false);
    } else {
      setTextError(true);
    }
  };
  const setTextCheck = () => {
    setTextError(0);
  };

  const setConsumerText = () => {
    const div = textRef.current;
    const innerText = div.children[1].children[0].value;
    setConsumerName(innerText);
  };


  
  return (

 

    <Box
    sx={{
      backgroundColor: "primary.light",
      marignTop: 0,
      marginBottom: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Container
      disableGutters
      fixed
      sx={{
        marignTop: 0,
        marginBottom: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ p: 3 }}>
        <form>
          <Stack
            direction="column"
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
          >
            <TextField
              onChange={setConsumerText}
              required
              ref={textRef}
              onBlur={checkText}
              onFocus={setTextCheck}
              id="outlined-basic"
              label="Enter Name"
              variant="outlined"
              error={textError}

            />

            <LoadingButton
              type="submit"
              size="small"
              onClick={handleClick}
              loading={loading}
              loadingPosition="start"
              startIcon={<SendRoundedIcon />}
              variant="contained"
              
            >
              <span>Giriş Yap</span>
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Container>
  </Box>
  );
};

export default EnterName;
