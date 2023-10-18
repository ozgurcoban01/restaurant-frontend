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
  import MainMenus from "./MainMenus";
  import { setCardCount, setCardList, setCardPrice } from "../../redux/features/cardSlice";
  import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
  import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
  import { useParams } from "react-router";
  import VerifiedIcon from '@mui/icons-material/Verified';

const AdminPanel = () => {
    const [open, setOpen] = React.useState(false);
  const [sended, setSended] = React.useState(false);
  const drawerOpen = useSelector((state) => state.drawer);
  const tableId = useSelector((state) => state.table.tableId);
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
      table_id: tableId,
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
    <>
    <Box
      sx={{
        miNWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "primary.light",
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
    }}>Admin Panel</Box>
            {isSmall ? (
              <Badge
                onClick={setCardOpenFunc}
                badgeContent={cardCount}
                color="secondary"
              >
                <ShoppingCartIcon sx={{opacity:"0"}}/>
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
   
      </Box>

      <ConsumerDrawer />

   
    </Box>
  </>
  )
}

export default AdminPanel