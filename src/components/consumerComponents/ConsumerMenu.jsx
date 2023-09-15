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
} from "@mui/material";
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
import { setCardCount, setCardPrice } from "../../redux/features/cardSlice";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
const ConsumerMenu = () => {
  const drawerOpen = useSelector((state) => state.drawer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [cardAnchor, setCardAnchor] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const cardCount = useSelector((state) => state.card.cardCount);
  const cardList = useSelector((state) => state.card.cardList);
  const cardPrice = useSelector((state) => state.card.cardPrice);

  const setCardCloseFunc = () => {
    setCardAnchor(null);
    setCardOpen(false);
  };
  const setCardOpenFunc = (e) => {
    setCardAnchor(e.currentTarget);
    setCardOpen(true);
  };
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    let cardPrice = 0;
    cardList.forEach((cardElement) => {
      cardPrice += cardElement.price;
    });

    dispatch(setCardPrice(cardPrice.toFixed(2)));
    dispatch(setCardCount(cardList.length));
  }, [cardList]);
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
                justifyContent: { sm: "center", xs: "space-between" },
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
              <Box>222</Box>
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

            justifyContent: { sm: "space-between", xs: "center" },
          }}
        >
          {!isSmall ? <LeftBar /> : null}
          <MainMenus />
          {!isSmall ? <RightBar /> : null}
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
            >
              {cardPrice}
            </Button>
            <IconButton color="secondary">
              <PaymentOutlinedIcon />
            </IconButton>
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default ConsumerMenu;
