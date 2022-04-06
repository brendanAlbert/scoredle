import { useMemo } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@mui/material";
import LeaderboardChart from "./LeaderboardChart";
import { crownify } from "../../../helpers/helpers";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 280,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#444",
  color: "#ffffff",
  padding: "20px",
  textAlign: "center",
  p: 6,
  px: 6,
  pb: 6,
};

const Letter = styled("span")({
  textTransform: "uppercase",
  padding: "4px",
  margin: "1px",
});

const LetterBox = styled("span")({
  minHeight: "25px",
  height: "25px",
  width: "25px",
  minWidth: "25px",
  border: "1px solid #FFF",
  marginRight: "2px",
});

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function LeaderboardModal({
  LeaderboardModalOpen,
  setLeaderboardModalOpen,
  scores,
}) {
  const { user } = useAuth0();
  let mobile = useMediaQuery(`(max-width: 662px)`);

  const closeModal = () => {
    setLeaderboardModalOpen(false);
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    const keys = ["Enter", "Space"];
    if (keys.includes(event.code)) {
      closeModal();
    }
  };

  const userWordleCrownScores = useMemo(() => {
    let user_wordle_crown_scores = {};
    const allusers = scores.map((dateobject) => {
      dateobject.scores.map((userobject) => {
        if (user_wordle_crown_scores[userobject.name] === undefined) {
          user_wordle_crown_scores[userobject.name] = 0;
        }
      });
      let winner = crownify(dateobject.scores, "wordle");
      if (winner) {
        user_wordle_crown_scores[winner]++;
      }
    });

    const sorted = Object.entries(user_wordle_crown_scores).sort(
      ([, a], [, b]) => b - a
    );

    return sorted;
  }, [scores]);

  const CloseLeaderboardModalIcon = (
    <Box
      tabIndex={0}
      sx={{
        color: "#ee5253",
        position: "absolute",
        right: "18px",
        display: "flex",
        top: "18px",
        background: "#00000024",
        borderRadius: "6px",
        cursor: "pointer",
        "&: hover": {
          color: "red",
        },
      }}
      onKeyPress={handleKeyPress}
      onClick={() => closeModal()}
    >
      <CloseIcon
        sx={{
          fontSize: "38px",
        }}
      />
    </Box>
  );

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={LeaderboardModalOpen}
        onClose={closeModal}
        BackdropComponent={Backdrop}
      >
        <Box
          sx={{
            position: "relative",
            width: mobile ? "calc(100% - 20px)" : "calc(100% - 200px)",
            maxWidth: "1000px",
            margin: "0 auto",
            background: "#444",
            maxHeight: "704px",
            paddingBottom: "40px",
            overflowY: "scroll",
            height: mobile ? "calc(100% - 100px)" : "calc(100% - 200px)",
          }}
        >
          {CloseLeaderboardModalIcon}

          <h1 style={{ color: "#FFF", paddingLeft: "30px" }}>Leaderboard</h1>
          <Box
            sx={
              mobile
                ? {
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "1fr",
                    minHeight: "240px",
                  }
                : {
                    display: "grid",
                    width: "100%",
                    gridTemplateColumns: "repeat(1, 1fr)",
                    minHeight: "240px",
                  }
            }
          >
            <ThemeProvider theme={darkTheme}>
              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                }}
              >
                <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
                  <LetterBox>
                    <Letter>W</Letter>
                  </LetterBox>
                  <LetterBox>
                    <Letter>O</Letter>
                  </LetterBox>
                  <LetterBox>
                    <Letter>R</Letter>
                  </LetterBox>
                  <LetterBox>
                    <Letter>D</Letter>
                  </LetterBox>
                  <LetterBox>
                    <Letter>L</Letter>
                  </LetterBox>
                  <LetterBox>
                    <Letter>E</Letter>
                  </LetterBox>

                  <span style={{ paddingLeft: "10px" }}>Crowns 👑</span>
                </Box>
                <LeaderboardChart
                  users={userWordleCrownScores.map(
                    (userScoreArray) => userScoreArray[0]
                  )}
                  usersValuesArray={userWordleCrownScores.map(
                    (userScoreArray) => userScoreArray[1]
                  )}
                />
              </Paper>
              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                Wordle Max Streak - 👷 👷 🚧 Coming Soon !
              </Paper>
              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                Wordle Current Streak - 👷 👷 🚧 Coming Soon !
              </Paper>
              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                Mystery Features - Coming Soon !
              </Paper>
            </ThemeProvider>
          </Box>
        </Box>
      </StyledModal>
    </div>
  );
}
