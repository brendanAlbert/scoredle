import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { guid } from "../../helpers/helpers";
import getDirectionIcon from "../Directions/DirectionIcons";

function WorldleScoreGrid({ worldleScore }) {
  return (
    <div key={guid()}>
      {worldleScore?.map((scorearray) => (
        <Grid
          container
          key={guid()}
          style={{
            display: "flex",
          }}
        >
          <Grid
            sx={{
              mt: "-1px",
              display: "inline-flex",
              gap: "1px",
              direction: "row",
            }}
            key={guid()}
            item
          >
            {scorearray.map((colorNumber) =>
              colorNumber < 3 ? (
                <Paper
                  key={guid()}
                  sx={{
                    borderRadius: 0,
                    height: 15,
                    width: 15,
                    backgroundColor: () => {
                      return colorNumber == 0
                        ? "#C4C4C4"
                        : colorNumber == 1
                        ? "#f1c40f"
                        : colorNumber == 2
                        ? "#2ecc71"
                        : null;
                    },
                  }}
                />
              ) : (
                <span
                  style={{
                    paddingLeft: "2px",
                    height: "18px",
                    marginTop: "-1px",
                  }}
                  key={guid()}
                >
                  {getDirectionIcon(colorNumber)}
                </span>
              )
            )}
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

export default WorldleScoreGrid;
