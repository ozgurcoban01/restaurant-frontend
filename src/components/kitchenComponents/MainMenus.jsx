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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuAddForm from "./Forms/MenuAddForm";
import CategoryAddForm from "./Forms/CategoryAddForm";

const MainMenus = () => {
  const selCat = useSelector((state) => state.selCategory);
  const selCategory = selCat.selCategory;
  const allMenu = useSelector((state) => state.menu.menu);
  const allCategories = useSelector((state) => state.categories.categories);
  const adminPage=useSelector((state)=>state.adminPage.page)

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <Box
      sx={{
        width: { xs: "100vw", md: "80vw" },
        height: "80vh",
        backgroundColor: "transparent",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        scrollbarWidth: "0px",
      }}
    >
      {(() => {
        switch (adminPage) {
          case 'Menü Ekle':
            return <MenuAddForm/>
          case 'Kategori Ekle':
            return <CategoryAddForm/>
          default:
            return null
        }
      })()}
    </Box>
  );
};

export default MainMenus;
