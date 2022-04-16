import Container from "@mui/material/Container";
import Card from "./Card";
import { styled, Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { guid } from "../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { crownify } from "../../helpers/helpers";
import { Button } from "@mui/material";

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

export default function WordleFeed({
  filteredWordleScores,
  loading,
  setWordleCardsLoaded,
  wordleCardsLoaded,
  max,
}) {
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
        <span style={{ fontWeight: "500" }}>{" WORDLE "}</span>
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
          {filteredWordleScores &&
            filteredWordleScores?.map((dateObject) => (
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
                      marginTop: "12px",
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
                        crowned={crownify(dateObject?.scores, "wordle")}
                        toggleState={false}
                        userScoresObject={userScoresObject}
                      />
                    </div>
                  ))}

                  {!dateObject?.scores?.some(
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
                </Box>
              </div>
            ))}
          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {max > filteredWordleScores.length ? (
              <Button
                color="success"
                onClick={() => setWordleCardsLoaded(wordleCardsLoaded + 5)}
                variant="contained"
              >
                Load 5 More
              </Button>
            ) : (
              <Typography sx={{ color: "#FFF" }}>
                Reached the end of the feed! 🎉
              </Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
}
