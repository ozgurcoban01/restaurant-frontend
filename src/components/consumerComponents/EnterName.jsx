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
import { setConsumerNameRedux } from "../../redux/features/consumerSlice";

const EnterName = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const tableId = useSelector((state) => state.tableId);
 
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
      const fetchData = async () => {
        const consumerId = await axios
          .post(
            "https://pleasant-gloves-deer.cyclic.cloud/consumer/createNewConsumer",
            consumer
          )
          .then((res) => res.data._id);

        const goToMenu = (id) => {
          dispatch(setConsumerNameRedux(consumerName))
          
          navigate(`/consumer/consumerSelect/${id}`);
        };

        setTimeout(goToMenu(consumerId), 2000);
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
        backgroundColor: deepPurple[100],
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
