import Grid from "@mui/material/Grid";
import ScoreGrid from "./ScoreGrid";
import Typography from "@mui/material/Typography";

function Card({ score }) {
  /* What this 'length' ternary does:
    1 / 6
    2 / 6
    ...
    6 / 6 if they got it right on last guess
    OR
    X / 6 if they missed the wordle

    TODO 🚧 make sure X gets added correctly.
  */
  const length =
    score.score.length < 6
      ? score.score.length
      : score.score[5].includes(0) || score.score[5].includes(1)
      ? "X"
      : score.score.length;

  const ratio = `${length} / 6`;

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
          {score.name}
        </Typography>
      </Grid>
      <Grid item sx={{ minWidth: 100, maxWidth: 100 }} align="center">
        <ScoreGrid score={score.score} />
      </Grid>
      <Grid item sx={{ minWidth: 80, maxWidth: 80 }} align="center">
        <Typography component="div" sx={{ color: "#ffffff" }}>
          {ratio}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Card;
