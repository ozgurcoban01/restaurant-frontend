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
import MainMenuCard from "./MainMenuCard";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const MainMenus = () => {
  const selCat = useSelector((state) => state.selCategory);
  const selCategory = selCat.selCategory;
  const allMenu = useSelector((state) => state.menu.menu);
  const allCategories = useSelector((state) => state.categories.categories);
  console.log(selCategory);
  return (
    <Box
      sx={{
        width: { sm: "60vw", md: "60vw", xs: "100vw" },
        height: "80vh",
        backgroundColor: "transparent",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        scrollbarWidth: "0px",
      }}
    >
      {allCategories.map((category) => (
        <Box>
          <Typography variant="h7" component="h2">
            {category}
          </Typography>
          {allMenu.map((menu) => {
            if (menu.category==category&&(selCategory==category||selCategory=="all")) {
              return <MainMenuCard
              title={menu.title}
              price={menu.price}
              category={menu.category}
            />;
            }

            return null;
          })}
        </Box>
      ))}
    </Box>
  );
};

export default MainMenus;
