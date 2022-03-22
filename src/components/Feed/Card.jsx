import Grid from "@mui/material/Grid";
import ScoreGrid from "./ScoreGrid";
import WorldleScoreGrid from "./WorldleScoreGrid";
import Typography from "@mui/material/Typography";

function Card({ crowned, userScoresObject, toggleState }) {
  let length;

  if (toggleState === false && userScoresObject?.score?.length > 0) {
    length =
      userScoresObject?.score?.length < 6
        ? userScoresObject?.score?.length
        : userScoresObject?.score[5].includes(0) ||
          userScoresObject?.score[5].includes(1)
        ? "X"
        : userScoresObject?.score?.length;
  }

  if (toggleState === true && userScoresObject?.worldleScore?.length > 0) {
    length =
      userScoresObject?.worldleScore?.length < 6
        ? userScoresObject?.worldleScore?.length
        : userScoresObject?.worldleScore[5].includes(0) ||
          userScoresObject?.worldleScore[5].includes(1)
        ? "X"
        : userScoresObject?.worldleScore?.length;
  }

  const ratio = `${length} / 6`;

  let name =
    crowned && crowned === userScoresObject?.name && length !== "X"
      ? "👑 " + userScoresObject?.name
      : userScoresObject?.name;

  if (length) {
    return (
      <Grid
        container
        sx={{
          mt: "15px",
          justifyContent: "center",
          alignItems: "start",
        }}
        spacing={2}
      >
        <Grid item sx={{ minWidth: 95, maxWidth: 95, pr: 2 }} align="end">
          <Typography component="div" sx={{ color: "#ffffff" }}>
            {userScoresObject?.name ? userScoresObject.name : worldleScore.name}
          </Typography>
        </Grid>
        <Grid item sx={{ minWidth: 100, maxWidth: 100 }} align="center">
          {toggleState === false ? (
            <ScoreGrid score={userScoresObject.score} />
          ) : (
            <WorldleScoreGrid worldleScore={userScoresObject.worldleScore} />
          )}
        </Grid>
        <Grid item sx={{ minWidth: 80, maxWidth: 80 }} align="center">
          <Typography component="div" sx={{ color: "#ffffff" }}>
            {ratio}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return null;
}

export default Card;
