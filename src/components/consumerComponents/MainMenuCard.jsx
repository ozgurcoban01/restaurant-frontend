import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "../../redux/features/imagesSlice";
import axios from "axios";
import { setCategories } from "../../redux/features/categorySlice";
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
import { setCardList } from "../../redux/features/cardSlice";

const MainMenuCard = ({menu,title,price,category,image_id,menu_id}) => {

  const [imgSrc,setImgSrc]=useState()
  const dispatch=useDispatch()
  const images=useSelector((state)=>state.images.images)
  const cardList=useSelector((state)=>state.card.cardList)

  const selectedImage=images.filter(image => {
    return image._id === image_id;
  });

  useEffect( ()=>{
    var imagesSrcList=[];

    selectedImage.forEach(image => {
      const imgData=image.buffer.data

      var binary = '';
      var bytes = new Uint8Array( imgData );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }
      const imgSrc= window.btoa( binary );
      imagesSrcList.push(imgSrc)
    
    });
    setImgSrc(imagesSrcList[0])
   },[])

  const setCardInfo=(menu)=>{

    dispatch(setCardList([...cardList,menu]))
  
  }

  return (
    <Card sx={{width:"100%",minHeight:"18rem",backgroundColor:purple[100],mb:3}}>
        <CardMedia
          sx={{ height: 140 }}
          image={`data:image/png;base64,${imgSrc}`}
          title="green iguana"
        />
        <CardContent>
          <Typography sx={{color:purple[900],fontFamily:"roboto",fontWeight:"800",fontSize:"xl-larger"}} gutterBottom variant="h5" component="div">
          {title}
          </Typography>
          <Typography sx={{color:"black",fontFamily:"roboto",fontWeight:"100",fontSize:"xl-larger"}} variant="body2" color="white">
            {category}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="success" variant="contained" onClick={()=>setCardInfo(menu)} endIcon={<CurrencyLiraIcon />}>{price}</Button>
        </CardActions>
  
      </Card>
  )
}

export default MainMenuCard