import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FaceIcon from "@mui/icons-material/Face";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
const CardMenu = () => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        margin: 2,
        padding: 1,
        backgroundColor: purple[100],
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "50vw",height:"50vw",maxHeight:"200px",maxWidth:"200px", borderRadius: 2 }}
        image="https://picsum.photos/600/100"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
      
              display: "flex",
              flexDirection:"row",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <Chip
              sx={{ fontWeight: "900", fontSize: "large" }}
              label="34,48"
              variant="filled"
              color="success"
              icon={<AttachMoneyIcon />}
            />
            <Chip
              sx={{ fontWeight: "900", fontSize: "small" }}
              label="DELETE"
              variant="filled"
              color="error"
              icon={<HighlightOffIcon />}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CardMenu;
