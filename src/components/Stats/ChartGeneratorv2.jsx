import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { guid } from "../../helpers/helpers";

export default function ChartGenerator({
  usersValuesArray = [0, 1, 4, 8, 7, 3, 1],
}) {
  let mobile = useMediaQuery(`(max-width: 425px)`);

  const keys = ["1", "2", "3", "4", "5", "6", "X"];

  const getNormalizedArray = (array) => {
    // this will be useful for creating the bar chart when the numbers of peoples guesses reach the mid double digits
    let maxValue = usersValuesArray.reduce((a, b) => Math.max(a, b), -Infinity);
    let minValue = usersValuesArray.reduce((a, b) => Math.min(a, b), Infinity);

    let normalizedArray = array.map((value) => {
      return Math.floor(((value - minValue) / (maxValue - minValue)) * 100);
    });

    return normalizedArray;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {getNormalizedArray(usersValuesArray).map((val, idx) => (
        <div
          key={guid()}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <span style={{ paddingRight: "8px" }}>{keys[idx]}</span>
          <div
            style={{
              backgroundColor: "green",
              height: "12px",
              width: `${val}px`,
            }}
          ></div>
          <span style={{ paddingLeft: "8px" }}>{usersValuesArray[idx]}</span>
        </div>
      ))}
    </div>
  );
}
