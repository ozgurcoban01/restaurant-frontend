import { Box, Drawer, List,ListItem, ListItemButton,ListItemIcon, ListItemText } from "@mui/material";
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
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../../redux/features/drawerSlice";
import InboxIcon from "@mui/icons-material/Inbox";
import { setSelCategory } from "../../redux/features/selCategorySlice";
import { setAdminPage } from "../../redux/features/adminSelPage";

const ConsumerDrawer = () => {
    const drawerOpen = useSelector((state) => state.drawer);
    const dispatch=useDispatch()
  
    const cat = useSelector((state) => state.categories);
    const categories = cat.categories;
    const [allMenus,setAllMenus] = React.useState("all");
    const menus=["Menü Ekle","Kategori Ekle","Masa Ekle"]
    const adminPage=useSelector((state)=>state.adminPage.page)
    const [selectedIndex, setSelectedIndex] = React.useState("Menü Ekle");

    const handleListItemClick = (event, index,menu) => {
    
      setSelectedIndex(index);
      dispatch(setAdminPage(menu))
    };


      
  return (
    <Drawer
      anchor="left"
      open={drawerOpen.value}
      onClose={() => {
        dispatch(setDrawer(false))

      }}
    >
      <Box sx={{ width: "100%",height:"100%", backgroundColor: purple[900],color:"white" }}>
        <List component="nav" aria-label="secondary mailbox folder">
        {menus.map((menu,key)=>
            <ListItem disablePadding>
            <ListItemButton
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
    </Drawer>
  );
};

export default ConsumerDrawer;
