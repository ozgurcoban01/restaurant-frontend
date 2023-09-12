import { Box, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
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

const ConsumerDrawer = () => {
    const drawerOpen = useSelector((state) => state.drawer);
    const dispatch=useDispatch()
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
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
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Trash" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="Spam" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default ConsumerDrawer;
