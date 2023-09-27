import { Box, Drawer, List,ListItem, ListItemButton,ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
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

const ConsumerDrawer = () => {
    const drawerOpen = useSelector((state) => state.drawer);
    const dispatch=useDispatch()
  
    const cat = useSelector((state) => state.categories);
    const categories = cat.categories;
    
    const [selectedIndex, setSelectedIndex] = React.useState("all");

    const handleListItemClick = (event, index,category) => {
    
      setSelectedIndex(index);
      dispatch(setSelCategory(category))
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
        <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === "all"}
              onClick={(event) => handleListItemClick(event,"all", "all")}
            >
              <ListItemIcon>
                <InboxIcon sx={{ color: "white" , "&&.mui-selected": {
        backgroundcolor: "pink"
      }}}/>
              </ListItemIcon>
              <ListItemText primary="Tümü" />
            </ListItemButton>
          </ListItem>

          {categories.map((category,key)=>
          <ListItem key={key} disablePadding>
            <ListItemButton
              selected={selectedIndex === key}
              onClick={(event) => handleListItemClick(event, key,category)}
            >
              <ListItemIcon>
                <InboxIcon sx={{ color: "white" }}/>
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
          )}

        </List>
      </Box>
    </Drawer>
  );
};

export default ConsumerDrawer;
