import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function WordleLogo() {
  return (
    <Grid
      container
      justifyContent="start"
      spacing={0.25}
      style={{
        minWidth: "87px",
      }}
    >
      {[0, 1, 2, 3, 4].map((value) => (
        <Grid key={value} item>
          <Paper
            sx={{
              borderRadius: 0,
              height: 12,
              width: 12,
              backgroundColor: () => {
                const randomColor = Math.floor(Math.random() * 3);
                return randomColor == 0
                  ? "#f1c40f"
                  : randomColor == 1
                  ? "#2ecc71"
                  : "#7f8c8d";
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
