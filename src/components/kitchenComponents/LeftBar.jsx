import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import {
  lime,
  purple,
  red,
  green,
  orange,
  deepOrange,
  deepPurple,
} from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { setSelCategory } from "../../redux/features/selCategorySlice";
import { setAdminPage } from "../../redux/features/adminSelPage";

const LeftBar = () => {
  const dispatch=useDispatch()
  const cat = useSelector((state) => state.categories);
  const categories = cat.categories;
  const [selectedIndex, setSelectedIndex] = React.useState("Menü Ekle");
  const [allMenus,setAllMenus] = React.useState("all");
  const menus=["Menü Ekle","Kategori Ekle","Verilen Siparişler"]
  const adminPage=useSelector((state)=>state.adminPage.page)
  const handleListItemClick = (event, index,menu) => {
    
    setSelectedIndex(index);
    dispatch(setAdminPage(menu))
  };

  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "80vh",
        width: "20vw",
        scrollbarWidth: "0px",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "100%", scrollbarWidth: "0px" }}>
        <List sx={{ backgroundColor: "transparent" }}>
          
          {menus.map((menu,key)=>
            <ListItem key={key} disablePadding sx={{pb:1}}>
            <ListItemButton sx={{borderRadius:"0 50px 50px 0"}}
              selected={menu==adminPage?true:false}
              onClick={(event) => handleListItemClick(event,key,menu)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={menu} />
            </ListItemButton>
          </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default LeftBar;
