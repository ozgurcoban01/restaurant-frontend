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
import AddIcon from '@mui/icons-material/Add';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';


const OrderMenuCard = ({order}) => {
    const [consumerName,setConsumerName]=useState("")
    const [tableName,setTableName]=useState("")
    const [price,setPrice]=useState(0)
    const [menu,setMenu]=useState([])

    const getConsumerName=async()=>{
        const response = await axios(
            `${import.meta.env.VITE_API_URL}/category/getAllCategory`
          )
            .then((res) => res.data)
            .then((data)=>{
                setConsumerName(data)
            })
          return;
    }
    const getTableName=async()=>{
        const response = await axios(
            `${import.meta.env.VITE_API_URL}/category/getAllCategory`
          )
            .then((res) => res.data)
            .then((data)=>{
                setTableName(data)
            })
          return;
    }
    

    useEffect(()=>{
        getConsumerName()
        getTableName()
        setPrice(order.price)
        setMenu(order.menu)
    },[])
  return (
    <Box>
        
    </Box>
  )
}

export default OrderMenuCard