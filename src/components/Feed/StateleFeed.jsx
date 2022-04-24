import Container from "@mui/material/Container";
import Card from "./Card";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { guid } from "../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { crownify } from "../../helpers/helpers";
import { Button } from "@mui/material";

const DAY_MS = 86_400_000;

export default function StateleFeed({
  filteredStateleScores,
  loading,
  setStateleCardsLoaded,
  stateleCardsLoaded,
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
        <span style={{ fontWeight: "500" }}>
          <span style={{ color: "green" }}>STATE</span>LE
        </span>{" "}
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
          {filteredStateleScores &&
            filteredStateleScores?.map((dateObject) => (
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
                      dateObject?.state_svg && dateObject?.state_svg !== ""
                        ? "10px"
                        : "0px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height:
                        dateObject?.state_svg && dateObject?.state_svg !== ""
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
                        ? dateObject.state
                        : ""}
                    </span>
                    <img
                      style={{ height: "100px" }}
                      src={dateObject?.state_svg}
                    />
                  </div>
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
                        crowned={crownify(dateObject?.scores, "statele")}
                        toggleState={"state"}
                        userScoresObject={userScoresObject}
                      />
                    </div>
                  ))}

                  {!dateObject?.scores?.some(
                    (userScoreObj) => userScoreObj.state_score
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
            {max > filteredStateleScores.length ? (
              <Button
                color="success"
                onClick={() => setStateleCardsLoaded(stateleCardsLoaded + 5)}
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
