import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";

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

export default function ButtonAppBar({ toggleDrawer, toggleState }) {
  let mobile = useMediaQuery(`(max-width: 400px)`);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                position: "absolute",
                left: mobile ? "10px" : "24px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {!toggleState ? <WordleLogo /> : <WorldleLogo />}
            </Box>

            <Typography
              variant="h4"
              align="center"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Scoredle
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                position: "absolute",
                right: mobile ? "10px" : "40px",
              }}
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
