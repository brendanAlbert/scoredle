import React, { useMemo } from "react";
import { styled, Box } from "@mui/system";
import ChartGeneratorv2 from "./ChartGeneratorv2";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { Paper } from "@mui/material";
import { crownify } from "../../helpers/helpers";

const H5 = styled("h5")({
  textAlign: "center",
});

const H3 = styled("h3")({
  marginTop: "32px",
});

const H5v2 = styled("h5")({});

const GraySpan = styled("span")({
  color: "#999",
});

const Letter = styled("span")({
  minWidth: "23px",
  textTransform: "uppercase",
  padding: "4px",
  margin: "1px",
  border: "1px solid #FFF",
});

const Backdrop = styled("div")`
  z-index: 100;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function StatsModal({
  setStatsModalOpenState,
  statsModalOpenState,
  scores,
}) {
  let mobile = useMediaQuery(`(max-width: 662px)`);

  const { user } = useAuth0();

  const myStats = useMemo(() => {
    const myScoresArray = scores
      .map((dateObject) => {
        const getWordleCrownWinner = crownify(dateObject.scores, "wordle");
        const getWorldleCrownWinner = crownify(dateObject.scores, "worldle");
        const getStateleCrownWinner = crownify(dateObject.scores, "statele");

        const thisDaysScores = dateObject?.scores
          ?.map((userObject) => {
            if (
              userObject.name ===
              (import.meta.env.VITE_USER || user?.given_name)
            ) {
              return {
                date: dateObject.date,
                wordScore: userObject.score,
                worldScore: userObject.worldleScore,
                stateScore: userObject.state_score,
                wordCrown: getWordleCrownWinner,
                worldCrown: getWorldleCrownWinner,
                stateCrown: getStateleCrownWinner,
              };
            }
          })
          .filter((result) => result !== undefined);
        return thisDaysScores[0];
      })
      .filter(
        (dayScoresObject) =>
          dayScoresObject?.wordScore !== undefined ||
          dayScoresObject?.worldScore !== undefined ||
          dayScoresObject?.stateScore !== undefined
      );

    const statsObject = {
      word: {
        games: {
          played: 0,
          winPercentage: 100,
        },
        streak: {
          max: 0,
          current: 0,
        },
        crowns: 0,
      },
      world: {
        games: {
          played: 0,
          winPercentage: 100,
        },
        streak: {
          max: 0,
          current: 0,
        },
        crowns: 0,
      },
      state: {
        games: {
          played: 0,
          winPercentage: 100,
        },
        streak: {
          max: 0,
          current: 0,
        },
        crowns: 0,
      },
      wordleScoreDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        X: 0,
      },
      worldleScoreDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        X: 0,
      },
      stateleScoreDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        X: 0,
      },
    };

    let wordMaxStreak = 0;
    let wordCurrentStreak = 0;

    let worldMaxStreak = 0;
    let worldCurrentStreak = 0;

    let stateMaxStreak = 0;
    let stateCurrentStreak = 0;

    myScoresArray
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((scoreObj) => {
        if (scoreObj?.wordScore?.length === 6) {
          if (scoreObj?.wordScore[5]?.filter((x) => x == 2).length === 5) {
            // got it in 6 guesses
            statsObject.wordleScoreDistribution[6]++;
            wordCurrentStreak++;
            if (wordCurrentStreak >= wordMaxStreak) {
              wordMaxStreak = wordCurrentStreak;
            }
          } else {
            // missed it
            wordCurrentStreak = 0;
            statsObject.wordleScoreDistribution["X"]++;
          }
        } else {
          if (scoreObj?.wordScore?.length > 0) {
            wordCurrentStreak++;
          }
          if (wordCurrentStreak >= wordMaxStreak) {
            wordMaxStreak = wordCurrentStreak;
          }
          if (scoreObj?.wordScore) {
            statsObject.wordleScoreDistribution[scoreObj?.wordScore?.length]++;
          }
        }

        if (scoreObj?.wordCrown && scoreObj?.wordCrown === user?.given_name) {
          statsObject.word.crowns++;
        }

        if (scoreObj?.worldScore?.length === 6) {
          // check if the last row is all 2s or else
          if (scoreObj?.worldScore[5]?.filter((x) => x == 2).length === 5) {
            // got it in 6 guesses
            statsObject.worldleScoreDistribution[6]++;
            worldCurrentStreak++;
            if (worldCurrentStreak >= worldMaxStreak) {
              worldMaxStreak = worldCurrentStreak;
            }
          } else {
            // missed it
            worldCurrentStreak = 0;
            statsObject.worldleScoreDistribution["X"]++;
          }
        } else {
          if (scoreObj?.worldScore?.length > 0) {
            worldCurrentStreak++;
            if (worldCurrentStreak >= worldMaxStreak) {
              worldMaxStreak = worldCurrentStreak;
            }

            if (scoreObj?.worldScore) {
              statsObject.worldleScoreDistribution[
                scoreObj?.worldScore?.length
              ]++;
            }
          }
        }

        if (scoreObj.worldCrown && scoreObj.worldCrown === user?.given_name) {
          statsObject.world.crowns++;
        }

        if (scoreObj?.stateScore?.length === 6) {
          // check if the last row is all 2s or else
          if (scoreObj?.stateScore[5]?.filter((x) => x == 2).length === 5) {
            // got it in 6 guesses
            statsObject.stateleScoreDistribution[6]++;
            stateCurrentStreak++;
            if (stateCurrentStreak >= stateMaxStreak) {
              stateMaxStreak = stateCurrentStreak;
            }
          } else {
            // missed it
            stateCurrentStreak = 0;
            statsObject.stateleScoreDistribution["X"]++;
          }
        } else {
          if (scoreObj?.stateScore?.length > 0) {
            stateCurrentStreak++;
            if (stateCurrentStreak >= stateMaxStreak) {
              stateMaxStreak = stateCurrentStreak;
            }

            if (scoreObj?.stateScore) {
              statsObject.stateleScoreDistribution[
                scoreObj?.stateScore?.length
              ]++;
            }
          }
        }

        if (scoreObj.stateCrown && scoreObj.stateCrown === user?.given_name) {
          statsObject.state.crowns++;
        }

        if (scoreObj.wordScore) {
          statsObject.word.games.played++;
          statsObject.word.games.winPercentage = Math.ceil(
            (
              (statsObject.word.games.played -
                statsObject.wordleScoreDistribution["X"]) /
              statsObject.word.games.played
            ).toFixed(2) * 100
          );
        }

        if (scoreObj.worldScore) {
          statsObject.world.games.played++;
          statsObject.world.games.winPercentage = Math.ceil(
            (
              (statsObject.world.games.played -
                statsObject.worldleScoreDistribution["X"]) /
              statsObject.world.games.played
            ).toFixed(2) * 100
          );
        }

        if (scoreObj.stateScore) {
          statsObject.state.games.played++;
          statsObject.state.games.winPercentage = Math.ceil(
            (
              (statsObject.state.games.played -
                statsObject.stateleScoreDistribution["X"]) /
              statsObject.state.games.played
            ).toFixed(2) * 100
          );
        }
      });

    statsObject.word.streak.max = wordMaxStreak;
    statsObject.word.streak.current = wordCurrentStreak;

    statsObject.world.streak.max = worldMaxStreak;
    statsObject.world.streak.current = worldCurrentStreak;

    statsObject.state.streak.max = stateMaxStreak;
    statsObject.state.streak.current = stateCurrentStreak;

    return statsObject;
  }, [scores]);

  const handleClick = (e) => {
    if (e.target.id === "backdrop") {
      closeModal();
    }
  };

  const closeModal = () => {
    setStatsModalOpenState(false);
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "#444",
    borderRadius: "6px",
    color: "#eee",
    maxHeight: mobile ? "550px" : "700px",
    height: mobile ? "550px" : "700px",
    padding: mobile ? "0px" : "0px 24px",
    marginBottom: "100px",
    overflowY: "scroll",
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        {statsModalOpenState && (
          <Backdrop id="backdrop" onClick={(e) => handleClick(e)}>
            <Box
              id="statsmodal"
              sx={{
                position: "fixed",
                zIndex: 200,
                top: "84px",
                width: mobile ? "calc(100% - 50px)" : "650px",
                left: "0px",
                right: "0px",
                margin: "0 auto",
                marginBottom: "50px",
              }}
            >
              <Box sx={style}>
                <Box
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
                  onClick={() => closeModal()}
                >
                  <CloseIcon
                    sx={{
                      fontSize: "38px",
                    }}
                  />
                </Box>
                <H3>Your Stats</H3>

                <div
                  style={
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
                          gridTemplateColumns: "1fr 1fr",
                          minHeight: "240px",
                        }
                  }
                >
                  <Paper
                    elevation={6}
                    sx={{
                      margin: "18px",
                      height: "260px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "260px",
                      }}
                    >
                      <H5>
                        <Letter>W</Letter>
                        <Letter>O</Letter>
                        <Letter>R</Letter>
                        <Letter>D</Letter>
                        <Letter>L</Letter>
                        <Letter>E</Letter>
                        <div style={{ paddingTop: "10px" }}>
                          score distribution
                        </div>
                      </H5>

                      {
                        <ChartGeneratorv2
                          usersValuesArray={Object.entries(
                            myStats.wordleScoreDistribution
                          ).map((kv) => kv[1])}
                        />
                      }
                    </div>
                  </Paper>

                  <Paper
                    elevation={6}
                    sx={{
                      margin: "18px",
                      height: "260px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "30px",
                        marginBottom: "30px",
                      }}
                    >
                      <H5v2>
                        Wordles
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            <GraySpan># Played</GraySpan>
                          </div>
                          <div>{myStats.word.games.played}</div>
                          <div>
                            <GraySpan>Win %</GraySpan>
                          </div>
                          <div>{myStats.word.games.winPercentage}%</div>
                        </Box>
                        <br />
                        Streak
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",

                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            🔥 <GraySpan>Max</GraySpan>
                          </div>
                          <div>
                            {myStats.word.streak.max}{" "}
                            <GraySpan>
                              {myStats.word.streak.max === 1 ? "day" : "days"}
                            </GraySpan>
                          </div>
                          <div>
                            📈 <GraySpan>Current</GraySpan>
                          </div>
                          <div>
                            {myStats.word.streak.current}{" "}
                            <GraySpan>
                              {myStats.word.streak.current === 1
                                ? "day"
                                : "days"}
                            </GraySpan>
                          </div>
                        </Box>
                        <br />
                        <Letter>W</Letter> Crowns
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",

                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            👑 <GraySpan>Wordle</GraySpan>
                          </div>
                          <div>{myStats.word.crowns}</div>
                        </Box>
                      </H5v2>
                    </div>
                  </Paper>

                  <Paper
                    elevation={12}
                    sx={{
                      margin: "18px",
                      height: "260px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <H5>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "24px",
                              lineHeight: "16px",
                              paddingRight: "8px",
                            }}
                          >
                            🌎
                          </span>{" "}
                          <span
                            style={{
                              fontWeight: "600",
                              fontSize: "18px",
                              letterSpacing: "1.5px",
                            }}
                          >
                            WOR<span style={{ color: "green" }}>L</span>DLE
                          </span>
                        </Box>
                        <div style={{ paddingTop: "10px" }}>
                          score distribution
                        </div>
                      </H5>

                      {
                        <ChartGeneratorv2
                          usersValuesArray={Object.entries(
                            myStats.worldleScoreDistribution
                          ).map((kv) => kv[1])}
                        />
                      }
                    </div>
                  </Paper>

                  <Paper
                    elevation={12}
                    sx={{
                      margin: "18px",
                      height: "260px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "30px",
                        marginBottom: "30px",
                      }}
                    >
                      <H5v2>
                        WOR<span style={{ color: "green" }}>L</span>DLES
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            <GraySpan># Played</GraySpan>
                          </div>
                          <div>{myStats.world.games.played}</div>
                          <div>
                            <GraySpan>Win %</GraySpan>
                          </div>
                          <div>{myStats.world.games.winPercentage}%</div>
                        </Box>
                        <br />
                        Streak
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",

                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            🔥 <GraySpan>Max</GraySpan>
                          </div>
                          <div>
                            {myStats.world.streak.max}{" "}
                            <GraySpan>
                              {myStats.world.streak.max === 1 ? "day" : "days"}
                            </GraySpan>
                          </div>
                          <div>
                            📈 <GraySpan>Current</GraySpan>
                          </div>
                          <div>
                            {myStats.world.streak.current}{" "}
                            <GraySpan>
                              {myStats.world.streak.current === 1
                                ? "day"
                                : "days"}
                            </GraySpan>
                          </div>
                        </Box>
                        <br />
                        <span style={{ fontSize: "18px" }}>🌎</span> Crowns
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            👑 <GraySpan>Worldle</GraySpan>
                          </div>
                          <div>{myStats.world.crowns}</div>
                        </Box>
                      </H5v2>
                    </div>
                  </Paper>

                  <Paper
                    elevation={12}
                    sx={{
                      margin: "18px",
                      height: "260px",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <H5>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "600",
                              fontSize: "18px",
                              letterSpacing: "1.5px",
                            }}
                          >
                            <span style={{ color: "green" }}>STATE</span>LE
                          </span>
                        </Box>
                        <div style={{ paddingTop: "10px" }}>
                          score distribution
                        </div>
                      </H5>

                      {
                        <ChartGeneratorv2
                          usersValuesArray={Object.entries(
                            myStats.stateleScoreDistribution
                          ).map((kv) => kv[1])}
                        />
                      }
                    </Box>
                  </Paper>

                  <Paper
                    elevation={12}
                    sx={{
                      margin: "18px",
                      height: "260px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "30px",
                        marginBottom: "30px",
                      }}
                    >
                      <H5v2>
                        <span style={{ color: "green" }}>STATE</span>LES
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            <GraySpan># Played</GraySpan>
                          </div>
                          <div>{myStats.state.games.played}</div>
                          <div>
                            <GraySpan>Win %</GraySpan>
                          </div>
                          <div>{myStats.state.games.winPercentage}%</div>
                        </Box>
                        <br />
                        Streak
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",

                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            🔥 <GraySpan>Max</GraySpan>
                          </div>
                          <div>
                            {myStats.state.streak.max}{" "}
                            <GraySpan>
                              {myStats.state.streak.max === 1 ? "day" : "days"}
                            </GraySpan>
                          </div>
                          <div>
                            📈 <GraySpan>Current</GraySpan>
                          </div>
                          <div>
                            {myStats.state.streak.current}{" "}
                            <GraySpan>
                              {myStats.state.streak.current === 1
                                ? "day"
                                : "days"}
                            </GraySpan>
                          </div>
                        </Box>
                        <br />
                        Crowns
                        <br />
                        <br />
                        <Box
                          sx={{
                            display: "grid",

                            gridTemplateColumns: "1fr 1fr",
                            columnGap: 2,
                          }}
                        >
                          <div>
                            👑 <GraySpan>Statele</GraySpan>
                          </div>
                          <div>{myStats.state.crowns}</div>
                        </Box>
                      </H5v2>
                    </div>
                  </Paper>

                  <br />
                  <br />
                </div>
              </Box>
            </Box>
          </Backdrop>
        )}
      </ThemeProvider>
    </>
  );
}
