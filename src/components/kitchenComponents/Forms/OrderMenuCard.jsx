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
import AddIcon from "@mui/icons-material/Add";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";

const OrderMenuCard = ({ order }) => {
  const [menus, setMenus] = useState(order.menu);
  console.log(order)
  return (
    <Box sx={{mt:2}}>
      <Card
        sx={{
          width: "100%",
          p: 3,
          minHeight: "100%",
          borderRadius: 5,
          backgroundColor: "primary.dark",
          paddingBottom: 0,
          mb: 2,
          mt: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ borderRadius: "10px", wordWrap: "break-word" }}>
          <Typography
            sx={{
              color: "primary.light",
              fontFamily: "roboto",
              fontWeight: "800",
              fontSize: "xx-large",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            <span style={{ color: "white" }}>SİPARİŞ NO :</span> {order._id}
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontFamily: "roboto",
              fontWeight: "100",
              fontSize: "large",
            }}
            variant="body2"
            color="white"
          >
            <span style={{ fontWeight: "900" }}>Müşteri:</span>{" "}
            {order.consumer_name} ({order.consumer_id})
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontFamily: "roboto",
              fontWeight: "100",
              fontSize: "large",
            }}
            variant="body2"
            color="white"
          >
            <span style={{ fontWeight: "900" }}>Masa:</span> {order.table_name}{" "}
            ({order.table_id})
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontFamily: "roboto",
              fontWeight: "100",
              fontSize: "large",
              paddingTop: "20px",
            }}
            variant="body2"
            color="white"
          >
            <span style={{ fontWeight: "900" }}>Güncel Durum: </span>{" "}
            <span
              style={{
                padding: "10px",
                backgroundColor: "orange",
                borderRadius: "10px",
                fontWeight: "900",
              }}
            >
              {order.status}
            </span>
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontFamily: "roboto",
              fontWeight: "100",
              fontSize: "large",
              paddingTop: "30px",
            }}
            variant="body2"
            color="white"
          >
            <span style={{ fontWeight: "900" }}>Menü Tutarı: </span>{" "}
            <span
              style={{
                padding: "10px",
                backgroundColor: "green",
                borderRadius: "10px",
                fontWeight: "900",
              }}
            >
              {order.price} TL
            </span>
          </Typography>
        </CardContent>

        <Typography
          sx={{
            color: "primary.light",
            fontFamily: "roboto",
            fontWeight: "800",
            fontSize: "xx-large",
            p:1,
            pb:0
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          <span style={{ color: "white" }}>MENÜLERİ</span>
        </Typography>
        
        <Box
          sx={{  backgroundColor:"rgba(255,255,255,0.3)",p:1,borderRadius:"10px",display:"flex", flexDirection: "row",flexWrap:"wrap",overflowX: "scroll", }}
        >
          {menus.map((menu) => {
            const [imgSrc, setImgSrc] = useState();
            const images = useSelector((state) => state.images.images);

            const selectedImage = images.filter((image) => {
              return image._id === menu.image_id;
            });

            useEffect(() => {
              var imagesSrcList = [];

              selectedImage.forEach((image) => {
                const imgData = image.buffer.data;

                var binary = "";
                var bytes = new Uint8Array(imgData);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                  binary += String.fromCharCode(bytes[i]);
                }
                const imgSrc = window.btoa(binary);
                imagesSrcList.push(imgSrc);
              });
              setImgSrc(imagesSrcList[0]);
            }, []);

            return (
              <Card
                sx={{
                  width:"200px",
                  maxWidth: "100%",
                  m: 1,
                  height: "",
                  borderRadius: 5,
                  backgroundColor:"primary.light",
                  mb: 3,
                  
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 70 }}
                  image={`data:image/png;base64,${imgSrc}`}
                  title="green iguana"
                />
                <CardContent sx={{p:1,pl:2}}>
                  <Typography
                    sx={{
                      color: "primary.dark",
                      fontFamily: "roboto",
                      fontWeight: "800",
                      fontSize: "xx-large",
                    }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {menu.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontFamily: "roboto",
                      fontWeight: "100",
                      fontSize: "xl-larger",
                    }}
                    variant="body2"
                    color="white"
                  >
                    <span style={{color:"primary.dark",fontWeight:"900",fontSize:"medium"}}>TUTAR: </span><span style={{padding:"7px",backgroundColor:"green",borderRadius:"10px",color:"white",fontWeight:"500"}}>{menu.price}TL</span>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
          
        </Box>
      </Card>
    </Box>
  );
};

export default OrderMenuCard;
