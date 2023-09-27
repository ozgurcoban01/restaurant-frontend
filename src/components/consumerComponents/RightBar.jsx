import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FaceIcon from "@mui/icons-material/Face";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import {
  lime,
  purple,
  red,
  green,
  orange,
  deepOrange,
  deepPurple,
} from "@mui/material/colors";
import { Backdrop, Button, Chip, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCardCount, setCardList, setCardPrice } from "../../redux/features/cardSlice";
import CardMenu from "./CardMenu";
import CardMenuDesktop from "./CardMenuDesktop";
import { useParams } from "react-router";
import axios from 'axios'
import VerifiedIcon from '@mui/icons-material/Verified';

const RightBar = ({ cardListProp }) => {
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
  const [sended, setSended] = React.useState(false);
  const cardPrice = useSelector((state) => state.card.cardPrice);
  const cardCount = useSelector((state) => state.card.cardCount);
  const cardList = useSelector((state) => state.card.cardList);
  const tableId = useSelector((state) => state.table.id);
  const tableName = useSelector((state) => state.table.name);
  const consumerName = useSelector((state) => state.consumer.name);
  const {consumerId}=useParams()


  const setOrder= async()=>{
    setOpen(true);
    const order={
      consumer_id: consumerId,
      consumer_name:consumerName,
      table_id: tableId,
      table_name: tableName,
      menu: cardList,
      status: "Cooking",
      price: cardPrice,
    }
    const newOrder = await axios
    .post(
      `${import.meta.env.VITE_API_URL}/order/createNewOrder`,
      order
    )
    .then(()=>{setTimeout(()=>{setSended(true);dispatch(setCardList([])),dispatch(setCardCount(0)),dispatch(setCardPrice(0))},1000)});

  }

  const handleClose = () => {
    setOpen(false);
    setSended(false);
  };


  return (
    <Box sx={{ backgroundColor: "transparent" }}>
      {cardCount ? (
        <Typography
          sx={{
            p: 5,
            pb: 0,
            color: purple[900],
            fontFamily: "roboto",
            fontSize: "xx-large",
            fontWeight: "900",
          }}
        >
          SEPET
        </Typography>
      ) : null}

      <Box
        sx={{
          width: "30vw",
          backgroundColor: "transparent",
          padding: 2,
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflowY: "scroll",
          scrollbarWidth: "0px",
        }}
      >
        {cardListProp.map((menu) => {
          return (
            <Box>
              <CardMenuDesktop sx={{ backgroundColor: "red" }} menu={menu} />{" "}
            </Box>
          );
        })}
        {cardCount ? (
          <Box
            sx={{
              backgroundColor: purple[900],
              borderRadius: 100,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
            }}
            color="ochre"
          >
            <Button
              variant="contained"
              sx={{ fontWeight: "900" }}
              endIcon={<CurrencyLiraIcon />}
              color="success"
              onClick={setOrder}
            >
              {cardPrice}
            </Button>
            <IconButton color="secondary">
              <PaymentOutlinedIcon />
            </IconButton>
          </Box>
        ) : null}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {sended?<Box sx={{width:"30%",height:"30%",borderRadius:10,backgroundColor:"green",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly"}}>
        <VerifiedIcon sx={{width:"40%",height:"40%"}}/>
        <Typography sx={{fontFamily:"roboto",fontSize:"large",fontWeight:"900"}}>Siparişiniz Hazırlanıyor :)</Typography>
        </Box>:<CircularProgress sx={{color:purple[100]}}/>}
      </Backdrop>
    </Box>
  );
};

export default RightBar;
