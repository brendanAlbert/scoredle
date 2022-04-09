import { useMemo } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
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

const colors = ["#2ECC71", "#F1C40F", "#7F8C8D"];

const WLetterBox = styled("span")({
  fontSize: "clamp(12px, 2vw ,16px)",
  padding: "4px 6px",
  fontWeight: 600,
  marginRight: "2px",
});

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function LeaderboardModal({
  dontShowUsersList,
  LeaderboardModalOpen,
  setLeaderboardModalOpen,
  scores,
}) {
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
    scores.map((dateobject) => {
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

    const filtered = sorted.filter((kvp) => {
      return !dontShowUsersList.includes(kvp[0]);
    });

    return filtered;
  }, [scores]);

  const userWorldleCrownScores = useMemo(() => {
    let user_worldle_crown_scores = {};
    scores.map((dateobject) => {
      dateobject.scores.map((userobject) => {
        if (user_worldle_crown_scores[userobject.name] === undefined) {
          user_worldle_crown_scores[userobject.name] = 0;
        }
      });
      let winner = crownify(dateobject.scores, "worldle");
      if (winner) {
        user_worldle_crown_scores[winner]++;
      }
    });

    const sorted = Object.entries(user_worldle_crown_scores).sort(
      ([, a], [, b]) => b - a
    );

    const filtered = sorted.filter((kvp) => {
      return !dontShowUsersList.includes(kvp[0]);
    });

    return filtered;
  }, [scores]);

  const streaksWordle = useMemo(() => {
    let user_word_curr_streaks = {};
    let user_word_max_streaks = {};
    scores
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((dateobject) => {
        dateobject.scores.map((userobject) => {
          if (userobject?.score?.length > 0 && userobject?.score?.length < 6) {
            if (user_word_curr_streaks[userobject.name]) {
              user_word_curr_streaks[userobject.name]++;
              user_word_max_streaks[userobject.name] = Math.max(
                user_word_max_streaks[userobject.name],
                user_word_curr_streaks[userobject.name]
              );
            } else if (!user_word_curr_streaks[userobject.name]) {
              user_word_curr_streaks[userobject.name] = 1;
              user_word_max_streaks[userobject.name] = 1;
            }
          } else if (userobject?.score?.length === 6) {
            if (userobject?.score[5]?.filter((x) => x === 2).length === 5) {
              if (user_word_curr_streaks[userobject.name]) {
                user_word_curr_streaks[userobject.name]++;
                user_word_max_streaks[userobject.name] = Math.max(
                  user_word_max_streaks[userobject.name],
                  user_word_curr_streaks[userobject.name]
                );
              } else if (!user_word_curr_streaks[userobject.name]) {
                user_word_curr_streaks[userobject.name] = 1;
                user_word_max_streaks[userobject.name] = 1;
              }
            } else {
              if (user_word_curr_streaks[userobject.name]) {
                user_word_curr_streaks[userobject.name] = 0;
              } else if (!user_word_curr_streaks[userobject.name]) {
                user_word_curr_streaks[userobject.name] = 0;
              }
            }
          }
        });
      });

    const maxsorted = Object.entries(user_word_max_streaks).sort(
      ([, a], [, b]) => b - a
    );

    const maxfiltered = maxsorted.filter((kvp) => {
      return !dontShowUsersList.includes(kvp[0]);
    });

    const currsorted = Object.entries(user_word_curr_streaks).sort(
      ([, a], [, b]) => b - a
    );

    const currfiltered = currsorted.filter((kvp) => {
      return !dontShowUsersList.includes(kvp[0]);
    });

    return [maxfiltered, currfiltered];
  }, [scores]);

  const streaksWorldle = useMemo(() => {
    let user_world_curr_streaks = {};
    let user_world_max_streaks = {};
    scores
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((dateobject) => {
        dateobject.scores.map((userobject) => {
          if (
            userobject?.worldleScore?.length > 0 &&
            userobject?.worldleScore?.length < 6
          ) {
            if (user_world_curr_streaks[userobject.name]) {
              user_world_curr_streaks[userobject.name]++;
              user_world_max_streaks[userobject.name] = Math.max(
                user_world_max_streaks[userobject.name],
                user_world_curr_streaks[userobject.name]
              );
            } else if (!user_world_curr_streaks[userobject.name]) {
              user_world_curr_streaks[userobject.name] = 1;
              user_world_max_streaks[userobject.name] = 1;
            }
          } else if (userobject?.worldleScore?.length === 6) {
            if (
              userobject?.worldleScore[5]?.filter((x) => x === 2).length === 5
            ) {
              if (user_world_curr_streaks[userobject.name]) {
                user_world_curr_streaks[userobject.name]++;
                user_world_max_streaks[userobject.name] = Math.max(
                  user_world_max_streaks[userobject.name],
                  user_world_curr_streaks[userobject.name]
                );
              } else if (!user_world_curr_streaks[userobject.name]) {
                user_world_curr_streaks[userobject.name] = 1;
                user_world_max_streaks[userobject.name] = 1;
              }
            } else {
              if (user_world_curr_streaks[userobject.name]) {
                user_world_curr_streaks[userobject.name] = 0;
              } else if (!user_world_curr_streaks[userobject.name]) {
                user_world_curr_streaks[userobject.name] = 0;
              }
            }
          }
        });
      });

    const maxsorted = Object.entries(user_world_max_streaks).sort(
      ([, a], [, b]) => b - a
    );

    const currsorted = Object.entries(user_world_curr_streaks).sort(
      ([, a], [, b]) => b - a
    );

    const maxfiltered = maxsorted.filter((kvp) => {
      return !dontShowUsersList.includes(kvp[0]);
    });

    const currfiltered = currsorted.filter((kvp) => {
      return !dontShowUsersList.includes(kvp[0]);
    });

    return [maxfiltered, currfiltered];
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
                  <WLetterBox
                    sx={{
                      backgroundColor: colors[Math.floor(Math.random() * 3)],
                    }}
                  >
                    W
                  </WLetterBox>
                  <WLetterBox
                    sx={{
                      backgroundColor: colors[Math.floor(Math.random() * 3)],
                    }}
                  >
                    O
                  </WLetterBox>
                  <WLetterBox
                    sx={{
                      backgroundColor: colors[Math.floor(Math.random() * 3)],
                    }}
                  >
                    R
                  </WLetterBox>
                  <WLetterBox
                    sx={{
                      backgroundColor: colors[Math.floor(Math.random() * 3)],
                    }}
                  >
                    D
                  </WLetterBox>
                  <WLetterBox
                    sx={{
                      backgroundColor: colors[Math.floor(Math.random() * 3)],
                    }}
                  >
                    L
                  </WLetterBox>
                  <WLetterBox
                    sx={{
                      backgroundColor: colors[Math.floor(Math.random() * 3)],
                    }}
                  >
                    E
                  </WLetterBox>

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
                }}
              >
                <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
                  <span>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      W
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      O
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      R
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      D
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      L
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      E
                    </WLetterBox>
                    <span style={{ paddingLeft: "10px" }}>Max Streak 🔥</span>
                  </span>
                </Box>

                <LeaderboardChart
                  users={streaksWordle[0].map(
                    (userScoreArray) => userScoreArray[0]
                  )}
                  usersValuesArray={streaksWordle[0].map(
                    (userScoreArray) => userScoreArray[1]
                  )}
                />
              </Paper>

              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                }}
              >
                <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
                  <span>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      W
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      O
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      R
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      D
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      L
                    </WLetterBox>
                    <WLetterBox
                      sx={{
                        backgroundColor: colors[Math.floor(Math.random() * 3)],
                      }}
                    >
                      E
                    </WLetterBox>
                    <span style={{ paddingLeft: "10px" }}>
                      Current Streak 📈
                    </span>
                  </span>
                </Box>
                <LeaderboardChart
                  users={streaksWordle[1].map(
                    (userScoreArray) => userScoreArray[0]
                  )}
                  usersValuesArray={streaksWordle[1].map(
                    (userScoreArray) => userScoreArray[1]
                  )}
                />
              </Paper>

              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                }}
              >
                <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
                  <span style={{ fontWeight: "600", letterSpacing: "1.5px" }}>
                    WOR<span style={{ color: "green" }}>L</span>DLE
                  </span>
                  <span style={{ paddingLeft: "10px" }}>Crowns 👑</span>
                </Box>
                <LeaderboardChart
                  users={userWorldleCrownScores.map(
                    (userScoreArray) => userScoreArray[0]
                  )}
                  usersValuesArray={userWorldleCrownScores.map(
                    (userScoreArray) => userScoreArray[1]
                  )}
                />
              </Paper>

              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                }}
              >
                <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
                  <span>
                    <span style={{ fontWeight: "600", letterSpacing: "1.5px" }}>
                      WOR<span style={{ color: "green" }}>L</span>DLE
                    </span>
                    <span style={{ paddingLeft: "10px" }}>Max Streak 🔥</span>
                  </span>
                </Box>
                <LeaderboardChart
                  users={streaksWorldle[0].map(
                    (userScoreArray) => userScoreArray[0]
                  )}
                  usersValuesArray={streaksWorldle[0].map(
                    (userScoreArray) => userScoreArray[1]
                  )}
                />
              </Paper>

              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
                }}
              >
                <Box sx={{ paddingTop: "20px", paddingLeft: "20px" }}>
                  <span>
                    <span style={{ fontWeight: "600", letterSpacing: "1.5px" }}>
                      WOR<span style={{ color: "green" }}>L</span>DLE
                    </span>
                    <span style={{ paddingLeft: "10px" }}>
                      Current Streak 📈
                    </span>
                  </span>
                </Box>
                <LeaderboardChart
                  users={streaksWorldle[1].map(
                    (userScoreArray) => userScoreArray[0]
                  )}
                  usersValuesArray={streaksWorldle[1].map(
                    (userScoreArray) => userScoreArray[1]
                  )}
                />
              </Paper>

              <Paper
                elevation={10}
                sx={{
                  margin: "18px",
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
