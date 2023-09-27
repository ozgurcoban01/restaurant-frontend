import {
  AppBar,
  Container,
  Toolbar,
  Box,
  useMediaQuery,
  useTheme,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Button,
  CircularProgress,
  Backdrop
} from "@mui/material";
import axios from 'axios'
import React, { useEffect, useState } from "react";
import {
  lime,
  purple,
  red,
  green,
  orange,
  deepOrange,
  deepPurple,
} from "@mui/material/colors";
import TapasIcon from "@mui/icons-material/Tapas";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../../redux/features/drawerSlice";
import ConsumerDrawer from "./ConsumerDrawer";
import AspectRatio from "@mui/joy/AspectRatio";
import CardMenu from "./CardMenu";
import InteractiveCard from "./CardMenu";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import MainMenus from "./MainMenus";
import { setCardCount, setCardList, setCardPrice } from "../../redux/features/cardSlice";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useParams } from "react-router";
import VerifiedIcon from '@mui/icons-material/Verified';
const ConsumerMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [sended, setSended] = React.useState(false);
  const drawerOpen = useSelector((state) => state.drawer);
  const tableId = useSelector((state) => state.table.id);
  const tableName = useSelector((state) => state.table.name);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [cardAnchor, setCardAnchor] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const cardCount = useSelector((state) => state.card.cardCount);
  const cardList = useSelector((state) => state.card.cardList);
  const cardPrice = useSelector((state) => state.card.cardPrice);
  const consumerName = useSelector((state) => state.consumer.name);
  const {consumerId}=useParams()

  const setCardCloseFunc = () => {
    setCardAnchor(null);
    setCardOpen(false);
  };
  const setCardOpenFunc = (e) => {
    setCardAnchor(e.currentTarget);
    setCardOpen(true);
  };
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    let cardPrice = 0;
    cardList.forEach((cardElement) => {
      cardPrice += cardElement.price;
    });

    dispatch(setCardPrice(cardPrice.toFixed(2)));
    dispatch(setCardCount(cardList.length));
  }, [cardList]);


  const setOrder= async()=>{
    setOpen(true);
    setCardOpen(false);

    const order={
      consumer_id: consumerId,
      consumer_name:consumerName,
      table_id: tableId,
      table_name: tableName,
      menu: cardList,
      status: "Cooking",
      price: cardPrice,
    }
    console.log(order)
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
    <>
      <Box
        sx={{
          miNWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: purple[100],
        }}
      >
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { md: "center", xs: "space-between" },
              }}
              disableGutters
            >
              {isSmall ? (
                <TapasIcon
                  onClick={() => {
                    dispatch(setDrawer(true));
                  }}
                ></TapasIcon>
              ) : null}
              <Box sx={{
        fontFamily: 'roboto',
      }}>Hoşgeldin {consumerName}</Box>
              {isSmall ? (
                <Badge
                  onClick={setCardOpenFunc}
                  badgeContent={cardCount}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </Badge>
              ) : null}
            </Toolbar>
          </Container>
        </AppBar>
        <Box
          sx={{
            display: "flex",

            justifyContent: { md: "space-between", xs: "center" },
          }}
        >
          {!isSmall ? <LeftBar /> : null}
          <MainMenus />
          {!isSmall ? <RightBar  cardListProp={cardList}/> : null}
        </Box>

        <ConsumerDrawer />
        <Menu anchorEl={cardAnchor} open={cardOpen} onClose={setCardCloseFunc}>
          {cardList.map((menu) => {
            return <CardMenu menu={menu} />;
          })}
          <Divider />
          <Box
            sx={{
              width: "100%",
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
        </Menu>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        {sended?<Box sx={{width:"70%",height:"50%",borderRadius:10,backgroundColor:"green",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-evenly"}}>
        <VerifiedIcon sx={{width:"40%",height:"40%"}}/>
        <Typography sx={{fontFamily:"roboto",fontSize:"large",fontWeight:"900"}}>Siparişiniz Hazırlanıyor :)</Typography>
        </Box>:<CircularProgress sx={{color:purple[100]}}/>}
      </Backdrop>
      </Box>
    </>
  );
};

export default ConsumerMenu;
