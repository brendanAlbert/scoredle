import Container from "@mui/material/Container";
import { useMemo } from "react";
import Card from "./Card";
import { styled, Box } from "@mui/system";

import Typography from "@mui/material/Typography";
import { guid } from "../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { crownify } from "../../helpers/helpers";

const earthPhases = ["🌏", "🌍", "🌎"];

const DAY_MS = 86_400_000;

const WLetterBox = styled("div")({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "8px",
  padding: "4px 6px",
  width: "2px",
  height: "4px",
  fontWeight: 800,
  marginRight: "2px",
  backgroundColor: "#538d4e",
});

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
        country: dateObject.country,
        word: dateObject.word,
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
                        position: "relative",
                        height:
                          dateObject?.svg && dateObject?.svg !== ""
                            ? "100px"
                            : "0px",
                        filter:
                          "invert(100%) sepia(100%) saturate(2%) hue-rotate(27deg) brightness(104%) contrast(101%)",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "110px",
                          fontSize: "10px",
                          color: "#aaa",
                        }}
                      >
                        {new Date() - new Date(dateObject?.date) >= DAY_MS
                          ? dateObject.country
                          : ""}
                      </span>
                      <img style={{ height: "100px" }} src={dateObject?.svg} />
                    </div>
                  </div>
                )}
                {toggleState === false && (
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
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        color: "#FFF",
                      }}
                    >
                      {new Date() - new Date(dateObject?.date) >= DAY_MS
                        ? dateObject?.word?.split("").map((char) => (
                            <WLetterBox key={guid()}>
                              <div style={{ color: "#FFF" }}>{char}</div>
                            </WLetterBox>
                          ))
                        : ""}
                    </span>
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
