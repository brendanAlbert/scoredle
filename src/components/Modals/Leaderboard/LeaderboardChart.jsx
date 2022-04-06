import * as React from "react";
import { useMediaQuery } from "@mui/material";
import { guid } from "../../../helpers/helpers";

export default function LeaderboardChart({
  users = ["Al", "Bo", "Ca", "De", "Fo"],
  usersValuesArray = [6, 4, 3, 2, 1],
}) {
  let mobile = useMediaQuery(`(max-width: 420px)`);
  let minitablet = useMediaQuery(`(max-width: 570px)`);
  let tablet = useMediaQuery(`(max-width: 770px)`);
  let smalldesktop = useMediaQuery(`(max-width: 930px)`);

  const getNormalizedArray = (array) => {
    // this will be useful for creating the bar chart when the numbers of peoples guesses reach the mid double digits
    let maxValue = usersValuesArray.reduce((a, b) => Math.max(a, b), -Infinity);
    let minValue = usersValuesArray.reduce((a, b) => Math.min(a, b), Infinity);

    let normalizedArray = array.map((value) => {
      return (
        Math.floor(
          ((value - minValue) / (maxValue - minValue)) *
            100 *
            (mobile ? 1 : minitablet ? 2 : tablet ? 3 : smalldesktop ? 3.25 : 5)
        ) + 2
      );
    });

    return normalizedArray;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "24px",
        flexDirection: "column",
      }}
    >
      {getNormalizedArray(usersValuesArray).map((val, idx) => (
        <div
          key={guid()}
          style={{
            display: "grid",
            alignItems: "center",
            width: "100%",
            gridTemplateColumns: mobile ? "10px 100px 2fr" : "10px 110px 3fr",
          }}
        >
          <span>
            {idx === 0 ? "🥇 " : idx === 1 ? "🥈 " : idx === 2 ? "🥉 " : ""}
          </span>
          <span
            style={{
              paddingRight: "8px",
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              alignContent: "center",
              textAlign: "end",
            }}
          >
            {users[idx]}
          </span>
          <div
            style={{
              display: "flex",
              paddingTop: "6px",
            }}
          >
            <div
              style={{
                backgroundColor: "green",
                height: "16px",
                width: `${val}px`,
              }}
            ></div>
            <span style={{ paddingLeft: "8px" }}>{usersValuesArray[idx]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
