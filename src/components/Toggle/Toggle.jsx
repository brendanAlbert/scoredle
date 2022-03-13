import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#44bd32" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function ScoredleToggle({ toggleState, setToggleState }) {
  const handleToggle = () => {
    setToggleState(!toggleState);
  };
  return (
    <FormGroup
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        style={{ fontSize: "16px", fontWeight: "bold", paddingTop: "10px" }}
      >
        <span
          style={{
            color: !toggleState ? "#fff" : "#666",
            fontSize: !toggleState ? "16px" : "12px",
          }}
        >
          WORDLE
        </span>{" "}
        /{" "}
        <span
          style={{
            color: !toggleState ? "#666" : "#fff",
            fontSize: !toggleState ? "12px" : "16px",
          }}
        >
          WOR<span style={{ color: "green" }}>L</span>DLE
        </span>
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography style={{ fontSize: "20px", fontWeight: "bold" }}>
          W
        </Typography>
        <FormControlLabel
          control={
            <MaterialUISwitch
              onClick={handleToggle}
              checked={toggleState}
              sx={{ m: 1 }}
            />
          }
          label=""
        />{" "}
        <Typography style={{ fontSize: "22px" }}>🌎</Typography>
      </Stack>
    </FormGroup>
  );
}
