import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Card from "./Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { guid } from "../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";

const earthPhases = ["🌏", "🌍", "🌎"];

export default function Cards({
  scores: allDateObjects,
  dontShowUsers,
  loading,
  toggleState,
}) {
  const { user, isLoading } = useAuth0();

  const [cardsScores, setcardsScores] = useState([]);

  useEffect(() => {
    let sortedScoredleDateObjectsArray = allDateObjects.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let filtered = sortedScoredleDateObjectsArray?.map((dateObject) => {
      if (dontShowUsers?.length > 0) {
        let filteredScores;

        filteredScores = dateObject.scores.filter((scoreUser) => {
          return !dontShowUsers.some((dsu) => dsu == scoreUser.name);
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
          mt: 11,
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

      {loading || isLoading ? (
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
                        toggleState={toggleState}
                        userScoresObject={userScoresObject}
                      />
                    </div>
                  ))}

                  {toggleState === false &&
                    dateObject?.scores[0]?.score === undefined && (
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

                  {toggleState === false &&
                    dateObject?.scores[0]?.score?.length == 0 && (
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
                    dateObject?.scores[0]?.worldleScore?.length == 0 && (
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
                    dateObject?.scores[0]?.worldleScore == undefined && (
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
