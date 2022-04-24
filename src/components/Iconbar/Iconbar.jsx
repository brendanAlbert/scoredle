import { useState } from "react";
import Box from "@mui/material/Box";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useAuth0 } from "@auth0/auth0-react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Iconbar = ({
  loading,
  setaddSvgModalOpen,
  setLeaderboardModalOpen,
  setmodalOpenState,
  setWorldleModalOpenState,
  setStateleModalOpenState,
  toggleState,
}) => {
  const { user } = useAuth0();
  const [anchorElAddSvg, setAnchorElAddSvg] = useState(null);
  const [anchorElLeaderboard, setAnchorElLeaderboard] = useState(null);
  const [anchorElAddScore, setAnchorElAddScore] = useState(null);

  const handleKeyPress = (event) => {
    event.preventDefault();
    const keys = ["Enter", "Space"];
    if (keys.includes(event.code)) {
      openAddCountryModal();
    }
  };

  const handleOpenLeaderboardKeyPress = (event) => {
    event.preventDefault();
    const keys = ["Enter", "Space"];
    if (keys.includes(event.code)) {
      openLeaderboardModal();
    }
  };

  const handleOpenAddScoreKeyPress = (event) => {
    event.preventDefault();
    const keys = ["Enter", "Space"];
    if (keys.includes(event.code)) {
      openAddScoreModal();
    }
  };

  const handlePopoverAddSvgOpen = (event) => {
    setAnchorElAddSvg(event.currentTarget);
  };

  const handlePopoverAddScoreOpen = (event) => {
    setAnchorElAddScore(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElLeaderboard(null);
    setAnchorElAddSvg(null);
    setAnchorElAddScore(null);
  };

  const handlePopoverLeaderboardOpen = (event) => {
    setAnchorElLeaderboard(event.currentTarget);
  };

  const addSvgOpen = Boolean(anchorElAddSvg);
  const leaderboardOpen = Boolean(anchorElLeaderboard);
  const addScoreOpen = Boolean(anchorElAddScore);

  const openAddCountryModal = () => {
    setaddSvgModalOpen(true);
  };

  const openLeaderboardModal = () => {
    setLeaderboardModalOpen(true);
  };

  const openAddScoreModal = () => {
    if (toggleState.word) {
      openWordleModal();
    }
    if (toggleState.world) {
      openWorldleModal();
    }
    if (toggleState.state) {
      openStateleModal();
    }
  };

  const openWordleModal = () => {
    setmodalOpenState(true);
  };

  const openWorldleModal = () => {
    setWorldleModalOpenState(true);
  };

  const openStateleModal = () => {
    setStateleModalOpenState(true);
  };

  return (
    <Box
      sx={{
        width: "70%",
        height: "30px",
        margin: "0 auto",
        marginTop: "78px",
        backgroundColor: "transparent",
        display: "flex",
        gap: 2,
        justifyContent: "center",
      }}
    >
      {/* {!loading && user?.given_name && user?.given_name === "Brendan" && (
        <>
          <Popover
            id="add-svg-icon"
            sx={{
              pointerEvents: "none",
            }}
            open={addSvgOpen}
            anchorEl={anchorElAddSvg}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: 70,
              horizontal: "right",
            }}
            onClose={handlePopoverClose}
          >
            <Typography sx={{ p: 1 }}>Add Country Svg</Typography>
          </Popover>
          <Box
            tabIndex={0}
            aria-owns={addSvgOpen ? "add-svg-icon" : undefined}
            aria-haspopup="true"
            onKeyPress={handleKeyPress}
            onMouseEnter={handlePopoverAddSvgOpen}
            onMouseLeave={handlePopoverClose}
            onClick={() => openAddCountryModal()}
            sx={{
              color: "#2ecc71",
              cursor: "pointer",
              "& : hover": {
                color: "#FFF",
              },
            }}
          >
            <AddPhotoAlternateIcon />
          </Box>
        </>
      )} */}

      {!loading && user && (
        <>
          <Popover
            id="open-leaderboard-icon"
            sx={{
              pointerEvents: "none",
            }}
            open={leaderboardOpen}
            anchorEl={anchorElLeaderboard}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            onClose={handlePopoverClose}
          >
            <Typography sx={{ p: 1 }}>Open Leaderboard</Typography>
          </Popover>
          <Box
            tabIndex={0}
            aria-owns={leaderboardOpen ? "open-leaderboard-icon" : undefined}
            aria-haspopup="true"
            onKeyPress={handleOpenLeaderboardKeyPress}
            onMouseEnter={handlePopoverLeaderboardOpen}
            onMouseLeave={handlePopoverClose}
            onClick={() => openLeaderboardModal()}
            sx={{
              color: "#e67e22",
              cursor: "pointer",
              "& : hover": {
                color: "#FFF",
              },
            }}
          >
            <LeaderboardIcon />
          </Box>

          <Popover
            id="add-score-icon"
            sx={{
              pointerEvents: "none",
            }}
            open={addScoreOpen}
            anchorEl={anchorElAddScore}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
          >
            <Typography sx={{ p: 1 }}>
              Add
              {toggleState.word
                ? " Wordle "
                : toggleState.world
                ? " Worldle "
                : " Statele "}
              Score
            </Typography>
          </Popover>
          <Box
            tabIndex={0}
            aria-owns={addScoreOpen ? "add-score-icon" : undefined}
            aria-haspopup="true"
            onKeyPress={handleOpenAddScoreKeyPress}
            onMouseEnter={handlePopoverAddScoreOpen}
            onMouseLeave={handlePopoverClose}
            onClick={() => openAddScoreModal()}
            sx={{
              color: "#2ecc71",
              cursor: "pointer",
              "& : hover": {
                color: "#FFF",
              },
            }}
          >
            <AddBoxIcon />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Iconbar;
