import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useMemo, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import WordleLogo from "./WordleLogo";
import WorldleLogo from "./WorldleLogo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111111",
    },
    mode: "dark",
  },
});

const earthPhases = ["🌏", "🌍", "🌎"];

// let intervalId = -1;

export default function ButtonAppBar({ toggleDrawer, toggleState }) {
  // const [index, setIndex] = useState(0);
  // const [phase, setPhase] = useState(earthPhases[0]);

  // useEffect(() => {
  //   // if (toggleState) {
  //     if (inter)
  //   intervalId = setInterval(() => {
  //     setIndex((index + 1) % 3);
  //     setPhase(earthPhases[index]);
  //   }, 1000);
  //   // }
  //   console.log({
  //     line: 31,
  //     toggleState,
  //     msg: "NavBarUseEffectFired",
  //     intervalId,
  //   });
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [phase, index]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!toggleState ? <WordleLogo /> : <WorldleLogo />}
            </Box>

            <Typography
              variant="h4"
              align="center"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Sc
              {!toggleState
                ? "o"
                : earthPhases[Math.floor(Math.random() * earthPhases.length)]}
              redle
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
