import Container from "@mui/material/Container";
import Card from "./Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { guid } from "../helpers/helpers";

export default function Cards({ scores, curatedUsers }) {
  return (
    <Container sx={{ mb: "100px" }} maxWidth="lg">
      <Typography
        variant="h5"
        align="center"
        component="div"
        sx={{ color: "#ffffff", mt: 11, typography: "body1", flexGrow: 1 }}
      >
        wordle scores
      </Typography>

      {scores &&
        scores
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((dateObject) => (
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
                {dateObject.scores
                  .filter((score) => {
                    return curatedUsers.some(
                      (cu) => cu.name == score.name && cu.isShowing
                    );
                  })
                  .map((score) => (
                    <div key={guid()}>
                      <Card score={score} />
                    </div>
                  ))}

                {dateObject?.scores?.length == 0 && (
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
                    No scores yet today, be the first!
                  </Typography>
                )}
              </Box>
            </div>
          ))}
    </Container>
  );
}
