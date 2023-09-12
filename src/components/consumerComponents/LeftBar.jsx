import React from "react";
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
const LeftBar = () => {
  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "80vh",
        width: "25vw",
        scrollbarWidth:"0px" 
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "100%",        scrollbarWidth:"0px" }}>
        
          <List sx={{backgroundColor:"transparent"}}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
          </List>

      
      </Box>
      
    </Box>
  );
};

export default LeftBar;
