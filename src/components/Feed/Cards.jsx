import Container from "@mui/material/Container";
import { useMemo } from "react";
import Card from "./Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { guid } from "../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { crownify } from "../../helpers/helpers";

const earthPhases = ["🌏", "🌍", "🌎"];

export default function Cards({
  scores: allDateObjects,
  dontShowUsers,
  loading,
  toggleState,
}) {
  const filteredCardScores = useMemo(() => {
    let sortedScoredleDateObjectsArray = allDateObjects?.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let filtered = sortedScoredleDateObjectsArray?.map((dateObject) => {
      let filteredScores = dateObject?.scores?.filter((scoreUser) => {
        return !dontShowUsers?.some((dsu) => dsu == scoreUser.name);
      });

      return {
        date: dateObject.date,
        scores: filteredScores,
        svg: dateObject.svg,
      };
    });

    return filtered;
  }, [allDateObjects, dontShowUsers]);

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
          {filteredCardScores &&
            filteredCardScores?.map((dateObject) => (
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
                        height:
                          dateObject?.svg && dateObject?.svg !== ""
                            ? "100px"
                            : "0px",
                        filter:
                          "invert(100%) sepia(100%) saturate(2%) hue-rotate(27deg) brightness(104%) contrast(101%)",
                      }}
                    >
                      <img style={{ height: "100px" }} src={dateObject?.svg} />
                    </div>
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
                        crowned={crownify(
                          dateObject?.scores,
                          toggleState === false ? "wordle" : "worldle"
                        )}
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
