import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111111",
    },
    mode: "dark",
  },
});

export default function ButtonAppBar({toggleDrawer}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Grid container justifyContent="start" spacing={0.25}>
                {[0, 1, 2, 3, 4].map((value) => (
                  <Grid key={value} item>
                    <Paper
                      sx={{
                        borderRadius: 0,
                        height: 12,
                        width: 12,
                        backgroundColor: (theme) => {
                          const randomColor = Math.floor(Math.random() * 3);
                          return randomColor == 0
                            ? "#f1c40f"
                            : randomColor == 1
                            ? "#2ecc71"
                            : "#7f8c8d";
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
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
