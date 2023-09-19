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
import { Button, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCardList } from "../../redux/features/cardSlice";
import CardMenu from "./CardMenu";
import CardMenuDesktop from "./CardMenuDesktop";

const RightBar = ({ cardListProp }) => {
  const cardPrice = useSelector((state) => state.card.cardPrice);
  const cardCount = useSelector((state) => state.card.cardCount);
  return (
    <Box sx={{backgroundColor:"transparent"}}>
       {cardCount?   <Typography sx={{p:5,pb:0,color:purple[900],fontFamily:"roboto",fontSize:"xx-large",fontWeight:"900"}}>SEPET</Typography> :null}
   
<Box
      sx={{
        width: "30vw",
        backgroundColor: "transparent",
        padding: 2,
        height: "80vh",
        alignItems:"center",
        justifyContent:"center",
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
       {cardCount?<Box
              sx={{
                backgroundColor:purple[900],
               borderRadius:100,
       
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
              >
                {cardPrice}
              </Button>
              <IconButton color="secondary">
                <PaymentOutlinedIcon />
              </IconButton>
            </Box>:null}
    </Box>
    </Box>

   
  );
};

export default RightBar;
