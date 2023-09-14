import React, { useState } from "react";
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

const LeftBar = () => {
  const dispatch=useDispatch()
  const cat = useSelector((state) => state.categories);
  const categories = cat.categories;
  const [selectedIndex, setSelectedIndex] = React.useState("all");
  const [selCategory, setSelCategory] = useState("all");
  console.log(categories);
  const handleListItemClick = (event, index,category) => {
    dispatch(setSelCategory(category))
    setSelectedIndex(index);
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
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === "all"}
              onClick={(event) => handleListItemClick(event, "all")}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Tümü" />
            </ListItemButton>
          </ListItem>
          
          {categories.map((category,key)=>
            <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === key}
              onClick={(event) => handleListItemClick(event, key,category)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default LeftBar;
