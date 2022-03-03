import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function RightDrawer({
  drawerOpenState,
  toggleDrawer,
  setmodalOpenState,
  setCurateUserModalState
}) {
  const DRAWER_DIRECTION_FROM_RIGHT = "right";

  const { loginWithRedirect, isAuthenticated, logout } =
    useAuth0();

  const openModal = () => {
    setmodalOpenState(true);
  };

  const openCurateUsersModal = () => {
    setCurateUserModalState(true);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {!isAuthenticated && (
          <ListItem button key={"Login"} onClick={() => loginWithRedirect()}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>Log in</ListItemText>
          </ListItem>
        )}

        {isAuthenticated && (
          <>
            <ListItem button key={"Logout"} onClick={() => logout()}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItem>

            <Divider />

            <ListItem button onClick={openCurateUsersModal} key={"Curate User Feed"}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Curate User Feed"} />
            </ListItem>

            <ListItem button onClick={openModal} key={"Add Score"}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Score"} />
            </ListItem>

            
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Drawer
          anchor={DRAWER_DIRECTION_FROM_RIGHT}
          open={drawerOpenState}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </ThemeProvider>
    </div>
  );
}
