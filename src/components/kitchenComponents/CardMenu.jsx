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
import { useDispatch, useSelector } from "react-redux";
import { setCardList } from "../../redux/features/cardSlice";
const CardMenu = ({menu}) => {

  const theme = useTheme();
  const [imgSrc,setImgSrc]=useState()
  const [newCard,setNewCard]=useState([])
  const dispatch=useDispatch()
  const images=useSelector((state)=>state.images.images)
  const cardList=useSelector((state)=>state.card.cardList)
  const cardPrice=useSelector((state)=>state.card.cardPrice)

  const selectedImage=images.filter(image => {
    return image._id === menu.image_id;
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

   const deleteMenuFromCard=()=>{
    let filteredCard=[]
    filteredCard=cardList.filter(cardItem=>{
      return cardItem._id!=menu._id
    })
    dispatch(setCardList(filteredCard))

   }


  return (
    <Card
      sx={{
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        margin: 2,
        padding: 1,
        backgroundColor: "primary.light",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "50vw",height:"50vw",maxHeight:"200px",maxWidth:"200px", borderRadius: 2 }}
        image={`data:image/png;base64,${imgSrc}`}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {menu.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {menu.category}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
      
              display: "flex",
              flexDirection:"row",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Chip
              sx={{ fontWeight: "900", fontSize: "large" }}
              label={menu.price}
              variant="filled"
              color="success"
              icon={<AttachMoneyIcon />}
            />
            <Chip
              sx={{ fontWeight: "900", fontSize: "small" }}
              label="DELETE"
              variant="filled"
              color="error"
              icon={<HighlightOffIcon />}
              onClick={()=>deleteMenuFromCard()}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CardMenu;
