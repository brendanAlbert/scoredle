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
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toggle from "../Toggle/Toggle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function RightDrawer({
  drawerOpenState,
  toggleDrawer,
  setmodalOpenState,
  setWorldleModalOpenState,
  setCurateUserModalState,
  setStatsModalOpenState,
  toggleState,
  setToggleState,
  setaddSvgModalOpen,
  setfeaturesModalState,
}) {
  const DRAWER_DIRECTION_FROM_RIGHT = "right";

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const openWordleModal = () => {
    setmodalOpenState(true);
  };

  const openWorldleModal = () => {
    setWorldleModalOpenState(true);
  };

  const openCurateUsersModal = () => {
    setCurateUserModalState(true);
  };

  const openStatsModal = () => {
    setStatsModalOpenState(true);
  };

  const openAddCountryModal = () => {
    setaddSvgModalOpen(true);
  };

  const setLeaderboardModalOpen = () => {};

  const openFeaturesModal = () => {
    setfeaturesModalState(true);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const toggleList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Toggle toggleState={toggleState} setToggleState={setToggleState} />
      </List>
    </Box>
  );

  const handleLogout = () => {
    let result = confirm("are you sure you want to logout ?");
    if (result) {
      logout();
    }
  };

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
            <Divider />

            <ListItem
              button
              onClick={openCurateUsersModal}
              key={"Curate User Feed"}
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Curate User Feed"} />
            </ListItem>

            <ListItem
              button
              onClick={() => {
                if (toggleState == false) {
                  openWordleModal();
                }
                if (toggleState) {
                  openWorldleModal();
                }
              }}
              key={"Add Score"}
            >
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Score"} />
            </ListItem>

            <ListItem button onClick={() => openStatsModal()}>
              <ListItemIcon>
                <QueryStatsIcon />
              </ListItemIcon>
              <ListItemText primary={"My Stats"} />
            </ListItem>

            <ListItem button onClick={() => openFeaturesModal()}>
              <ListItemIcon>
                <WorkspacePremiumIcon />
              </ListItemIcon>
              <ListItemText primary={"Checkout Features"} />
            </ListItem>

            <ListItem button key={"Logout"} onClick={() => handleLogout()}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItem>

            {/* {user?.given_name && user?.given_name === "Brendan" && (
              <ListItem button onClick={() => openAddCountryModal()}>
                <ListItemIcon>
                  <AddPhotoAlternateIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Place Svg"} />
              </ListItem>
            )} */}
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
          {toggleList()}
          {list()}
        </Drawer>
      </ThemeProvider>
    </div>
  );
}
