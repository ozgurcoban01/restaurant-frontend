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

const MainMenuCard = ({title,price,category,image_id}) => {

  const [imgSrc,setImgSrc]=useState()
  const dispatch=useDispatch()
  const images=useSelector((state)=>state.images.images)

  const selectedImage=images.filter(image => {
    return image._id === image_id;
  });

  useEffect( ()=>{
    console.log()
    
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
    console.log(imgSrc)
    
   },[])
  
  return (
    <Card sx={{width:"100%",minHeight:"18rem",backgroundColor:purple[900],mb:3,color:"white"}}>
        <CardMedia
          sx={{ height: 140 }}
          image={`data:image/png;base64,${imgSrc}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {title}
          </Typography>
          <Typography variant="body2" color="white">
            {category}
          </Typography>
        </CardContent>
        <CardActions>
        <Button color="success" variant="contained"   endIcon={<CurrencyLiraIcon />}>{price}</Button>
        </CardActions>
  
      </Card>
  )
}

export default MainMenuCard