import * as React from "react";
import Container from "@mui/material/Container";
import Card from "./Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Cards({scores}) {

  console.log({
    scores,
    location: 'Cards.jsx'
  });
  return (
    <Container 
    sx={{ mb: "100px" }}
    maxWidth="lg">
      <Typography
        variant="h5"
        align="center"
        component="div"
        sx={{ color: "#ffffff", mt: 3, typography: "body1", flexGrow: 1 }}
      >
        wordle scores
      </Typography>

        {scores && scores.map((dateObject, index) => (
        
        <div key={dateObject.date + index}>
          <Typography variant="h6" align="center" component="div" sx={{ color: "#888888", mt: 4, typography: "body2", flexGrow: 1 }}>
          {dateObject.date}
        </Typography>

        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} spacing={2}>
          {dateObject.scores.map(score => (
            <div key={score.name}>
              <Card score={score}/>
            </div>
          ))}

          {
            dateObject?.scores?.length == 0 && (
              <Typography
        variant="h5"
        align="center"
        component="div"
        sx={{ color: "#ffffff", mt: 6, typography: "body1", flexGrow: 1 }}
      >
        No scores yet today, be the first!
      </Typography>
            )
          }
        </Box>
        </div>
        

        ))}
    </Container>
  )
}
