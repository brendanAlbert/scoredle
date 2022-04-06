import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Card from "./Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { guid } from "../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";

const earthPhases = ["🌏", "🌍", "🌎"];

export default function Cards({
  scores: allDateObjects,
  dontShowUsers,
  loading,
  toggleState,
}) {
  const [cardsScores, setcardsScores] = useState([]);

  const crownify = (dateObjectScoresArray) => {
    if (dateObjectScoresArray?.length === 0) return null;

    let tieIndexList = [[], [], [], [], [], []];

    if (toggleState === false) {
      dateObjectScoresArray?.forEach((userScoreObject, idx) => {
        if (userScoreObject?.score) {
          tieIndexList[userScoreObject?.score?.length - 1].push(idx);
        }
      });
    }

    if (toggleState === true) {
      dateObjectScoresArray?.forEach((userScoreObject, idx) => {
        if (userScoreObject?.worldleScore) {
          tieIndexList[userScoreObject?.worldleScore?.length - 1].push(idx);
        }
      });
    }

    for (let i = 0; i < 6; i++) {
      if (tieIndexList[i].length > 1 && i < 5) {
        return null;
      }
      if (tieIndexList[i].length === 1) {
        return dateObjectScoresArray[tieIndexList[i][0]].name;
      }
    }

    if (tieIndexList[5].length > 1) {
      let mappedLastRowList = [];
      mappedLastRowList = dateObjectScoresArray
        .map((dateObject, idx) => {
          if (tieIndexList[5].includes(idx)) {
            return dateObject;
          }
        })
        .filter((x) => x !== undefined);

      const LastRow = 5;
      let gotItLastGuessList = [];
      mappedLastRowList.forEach((userScoreObj) => {
        if (toggleState === false) {
          if (userScoreObj.score[LastRow].filter((x) => x === 2).length === 5) {
            gotItLastGuessList.push(userScoreObj);
          }
        }

        if (toggleState === true) {
          if (
            userScoreObj.worldleScore[LastRow].filter((x) => x === 2).length ===
            5
          ) {
            gotItLastGuessList.push(userScoreObj);
          }
        }
      });
      if (gotItLastGuessList.length === 1) return gotItLastGuessList[0].name;
      return null;
    }
  };

  useEffect(() => {
    let sortedScoredleDateObjectsArray = allDateObjects?.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let filtered = sortedScoredleDateObjectsArray?.map((dateObject) => {
      if (dontShowUsers?.length > 0) {
        let filteredScores;

        filteredScores = dateObject?.scores?.filter((scoreUser) => {
          return !dontShowUsers?.some((dsu) => dsu == scoreUser.name);
        });

        let newDateObject;

        newDateObject = {
          date: dateObject.date,
          scores: filteredScores,
        };

        return newDateObject;
      } else {
        return dateObject;
      }
    });

    setcardsScores(filtered);
  }, [allDateObjects, dontShowUsers, toggleState]);

  return (
    <Container sx={{ mb: "100px" }} maxWidth="lg">
      <Typography
        variant="h5"
        align="center"
        component="div"
        sx={{
          color: "#ffffff",
          mt: 1,
          typography: "body1",
          flexGrow: 1,
        }}
      >
        {!toggleState ? (
          <span style={{ fontWeight: "500" }}>{" WORDLE"}</span>
        ) : (
          <span style={{ fontWeight: "500" }}>
            {earthPhases[Math.floor(Math.random() * earthPhases.length)]} WOR
            <span style={{ color: "green" }}>L</span>DLE
          </span>
        )}{" "}
        scores
      </Typography>

      {loading ? (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {cardsScores &&
            cardsScores?.map((dateObject) => (
              <div key={guid()}>
                <Typography
                  variant="h6"
                  align="center"
                  component="div"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  sx={{
                    color: "#888888",
                    mt: 3,
                    typography: "body2",
                    flexGrow: 1,
                  }}
                >
                  {dateObject.date}
                </Typography>

                {toggleState === true && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop:
                        dateObject?.svg && dateObject?.svg !== ""
                          ? "10px"
                          : "0px",
                    }}
                  >
                    <div
                      style={{
                        filter:
                          "invert(100%) sepia(100%) saturate(2%) hue-rotate(27deg) brightness(104%) contrast(101%)",
                      }}
                      dangerouslySetInnerHTML={{ __html: dateObject.svg }}
                    ></div>
                  </div>
                )}
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  spacing={2}
                >
                  {dateObject?.scores?.map((userScoresObject) => (
                    <div key={guid()}>
                      <Card
                        crowned={crownify(dateObject?.scores)}
                        toggleState={toggleState}
                        userScoresObject={userScoresObject}
                      />
                    </div>
                  ))}

                  {toggleState === false &&
                    !dateObject?.scores?.some(
                      (userScoreObj) => userScoreObj.score
                    ) && (
                      <Typography
                        variant="h5"
                        align="center"
                        component="div"
                        sx={{
                          color: "#ffffff",
                          mt: 1,
                          typography: "body1",
                          flexGrow: 1,
                        }}
                        style={{ fontSize: "10px" }}
                      >
                        No scores yet today. Be the first!
                      </Typography>
                    )}

                  {toggleState === true &&
                    !dateObject?.scores?.some(
                      (userScoreObj) => userScoreObj.worldleScore
                    ) && (
                      <Typography
                        variant="h5"
                        align="center"
                        component="div"
                        sx={{
                          color: "#ffffff",
                          mt: 1,
                          typography: "body1",
                          flexGrow: 1,
                        }}
                        style={{ fontSize: "10px" }}
                      >
                        No scores yet today. Be the first!
                      </Typography>
                    )}
                </Box>
              </div>
            ))}
        </>
      )}
    </Container>
  );
}
