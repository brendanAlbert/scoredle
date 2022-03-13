import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import getDirectionIcon from "../Directions/DirectionIcons";
const NUMBER_OF_DIRECTION_ICONS = 17;
const MINIMUM_STARTING_NUMBER = 3;

let RandomDescendingNumbersList = [];
let satisfied = false;
let randomNumber;
let randomDirectionIcon;

export default function WorldleLogo() {
  useMemo(() => {
    while (!satisfied) {
      randomNumber = Math.floor(Math.random() * 3);
      RandomDescendingNumbersList.push(randomNumber);
      satisfied = RandomDescendingNumbersList.length == 5;
    }
    randomDirectionIcon = getDirectionIcon(
      Math.floor(
        Math.random() * NUMBER_OF_DIRECTION_ICONS + MINIMUM_STARTING_NUMBER
      )
    );
  }, [RandomDescendingNumbersList, randomDirectionIcon]);

  /*
        TODO create function to generate array of numbers 0,1,2
        if the country they guess is < 20% of the way to the answer, use [1,0,0,0,0]
        if the country they guess is < 40% of the way to the answer, use [2,1,0,0,0] 
        if the country they guess is < 60% of the way to the answer, use [2,2,1,0,0]
        if the country they guess is < 80% of the way to the answer, use [2,2,2,1,0]
        if the country they guess is < 100% of the way to the answer,use [2,2,2,2,1]

        append a random direction [↙️,➡️,⬇️,↗️➡⬅⬆⬇↖↗↘↙]
        
        #Worldle #44 X/6 (96%)
        🟩🟩🟩🟩⬛↙️
        🟩🟩🟩🟨⬛➡️
        🟩🟩🟩🟩⬛⬇️
        🟩🟩🟩🟩🟨↙️
        🟩🟩🟩🟩🟨⬇️
        🟩🟩🟩🟩🟨↗️

    */
  return (
    <Grid
      container
      justifyContent="start"
      spacing={0.25}
      style={{
        minWidth: "87px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {RandomDescendingNumbersList.map((number, index) => (
        <Grid key={index} item>
          <Paper
            sx={{
              borderRadius: 0,
              height: 12,
              width: 12,
              backgroundColor: () => {
                return number == 0
                  ? "#f1c40f"
                  : number == 1
                  ? "#2ecc71"
                  : "#7f8c8d";
              },
            }}
          />
        </Grid>
      ))}
      <Grid key={6} item>
        {randomDirectionIcon}
      </Grid>
    </Grid>
  );
}
