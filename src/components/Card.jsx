import Grid from "@mui/material/Grid";
import ScoreGrid from "./ScoreGrid";
import Typography from "@mui/material/Typography";

function Card({ score }) {
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
          {score.score.length}/6
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Card;
