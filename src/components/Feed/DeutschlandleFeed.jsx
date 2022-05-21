import Container from "@mui/material/Container";
import Card from "./Card";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { guid } from "../../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { crownify } from "../../helpers/helpers";
import { Button } from "@mui/material";

const DAY_MS = 86_400_000;

export default function DeutschlandleFeed({
  filteredDeutschlandleScores,
  loading,
  setDeutschlandleCardsLoaded,
  deutschlandleCardsLoaded,
  max,
}) {
  const deutschlandle = (
    <span>
      <span
        style={{
          color: "#111",
          textShadow: "1px 1px 0 #000",
        }}
      >
        Deut
      </span>
      <span
        style={{
          color: "#e74c3c",
          textShadow: "1px 1px 0 #000",
        }}
      >
        sch
      </span>
      <span
        style={{
          color: "#f1c40f",
          textShadow: "1px 1px 0 #000",
        }}
      >
        lan
      </span>
      <span
        style={{
          color: "green",
          textShadow: "1px 1px 0 #000",
        }}
      >
        dle
      </span>
    </span>
  );

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
        {deutschlandle}&nbsp; scores
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
          {filteredDeutschlandleScores?.map((dateObject) => (
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
                    dateObject?.de_svg && dateObject?.de_svg !== ""
                      ? "10px"
                      : "0px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height:
                      dateObject?.de_svg && dateObject?.de_svg !== ""
                        ? "100px"
                        : "0px",
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
                      ? dateObject.de_state
                      : ""}
                  </span>
                  <div
                    dangerouslySetInnerHTML={{ __html: dateObject?.de_svg }}
                  ></div>
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
                      crowned={crownify(dateObject?.scores, "deutschlandle")}
                      toggleState={"germany"}
                      userScoresObject={userScoresObject}
                    />
                  </div>
                ))}

                {!dateObject?.scores?.some(
                  (userScoreObj) => userScoreObj.de_score
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
            {max > filteredDeutschlandleScores.length ? (
              <Button
                color="success"
                onClick={() =>
                  setDeutschlandleCardsLoaded(deutschlandleCardsLoaded + 5)
                }
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
