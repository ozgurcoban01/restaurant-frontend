import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  lime,
  purple,
  red,
  green,
  orange,
  deepOrange,
  deepPurple,
} from "@mui/material/colors";
import { Chip } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderMenuCard from "./OrderMenuCard";
import LoadingButton from '@mui/lab/LoadingButton';


const OrderMenu = () => {
    const orders=useSelector((state)=>state.order.order)
    const [loading, setLoading] = React.useState(false);

    const handleClick= async () => {
        setLoading(true);
     
          setTimeout(()=>{setLoading(false)},1000)
    }
    useEffect(()=>{handleClick()},[])
    console.log(orders)
  return (
    <>
     <LoadingButton
      color="success"
        sx={{width:"150px"}}
          onClick={handleClick}
          loading={loading}
          variant="contained"
        > 
          <span>sırala</span>
        </LoadingButton>{orders.map((order) => {
                if (true) {
                  return (
                    <OrderMenuCard
                      order={order}
                    />
                  );
                }
                return null;
              })}

    </>
  )
}

export default OrderMenu