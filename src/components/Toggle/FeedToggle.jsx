import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Grid } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import PublicIcon from "@mui/icons-material/Public";
import { USAIcon } from "../../assets/icons/USAIcon";
import { GermanyIcon } from "../../assets/icons/GermanyIcon";

import { styled, Box } from "@mui/system";

const colors = ["#2ECC71", "#F1C40F", "#7F8C8D"];

export default function ToggleFeed({ toggleState, setToggleState }) {
  const [alignment, setAlignment] = useState(toggleState);

  useEffect(() => {
    setAlignment(toggleState);
  }, []);

  const handleAlignment = (_event, newAlignment) => {
    if (newAlignment) {
      setAlignment(newAlignment);
      setToggleState(newAlignment);
    }
  };

  const WLetterBox = styled("span")({
    fontSize: "16px",
    padding: "2px 4px",
    fontWeight: 600,
    marginRight: "2px",
  });

  const wordle = (
    <span>
      <WLetterBox
        sx={{
          backgroundColor: colors[Math.floor(Math.random() * 3)],
        }}
      >
        W
      </WLetterBox>
      <WLetterBox
        sx={{
          backgroundColor: colors[Math.floor(Math.random() * 3)],
        }}
      >
        O
      </WLetterBox>
      <WLetterBox
        sx={{
          backgroundColor: colors[Math.floor(Math.random() * 3)],
        }}
      >
        R
      </WLetterBox>
      <WLetterBox
        sx={{
          backgroundColor: colors[Math.floor(Math.random() * 3)],
        }}
      >
        D
      </WLetterBox>
      <WLetterBox
        sx={{
          backgroundColor: colors[Math.floor(Math.random() * 3)],
        }}
      >
        L
      </WLetterBox>
      <WLetterBox
        sx={{
          backgroundColor: colors[Math.floor(Math.random() * 3)],
        }}
      >
        E
      </WLetterBox>
    </span>
  );

  const worldle = (
    <span
      style={{
        color: "#FFF",
        fontSize: "22px",
        fontWeight: 700,
        paddingTop: "6px",
        paddingLeft: "6px",
        paddingRight: "6px",
      }}
    >
      WOR
      <span style={{ color: "green" }}>L</span>DLE
    </span>
  );

  const statele = (
    <span
      style={{
        color: "#FFF",
        fontSize: "22px",
        fontWeight: 700,
        paddingTop: "6px",
        paddingLeft: "6px",
      }}
    >
      <span style={{ color: "green" }}>STATE</span>LE
    </span>
  );

  const deutschlandle = (
    <span>
      <span
        style={{
          fontSize: "22px",
          color: "#111",
          textShadow: "1px 1px 0 #000",
        }}
      >
        Deut
      </span>
      <span
        style={{
          fontSize: "22px",
          color: "#e74c3c",
          textShadow: "1px 1px 0 #000",
        }}
      >
        sch
      </span>
      <span
        style={{
          fontSize: "22px",
          color: "#f1c40f",
          textShadow: "1px 1px 0 #000",
        }}
      >
        lan
      </span>
      <span
        style={{
          fontSize: "22px",
          color: "green",
          textShadow: "1px 1px 0 #000",
        }}
      >
        dle
      </span>
    </span>
  );

  return (
    <>
      <Grid container sx={{ maxWidth: "270px" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "6px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "40.5px",
            }}
          >
            {alignment === "word" && wordle}

            {alignment === "world" && worldle}

            {alignment === "state" && statele}

            {alignment === "germany" && deutschlandle}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            orientation="horizontal"
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              paddingBottom: "18px",
            }}
          >
            <ToggleButton value="word" aria-label="left aligned">
              <AbcIcon />
            </ToggleButton>
            <ToggleButton value="world" aria-label="centered">
              <PublicIcon />
            </ToggleButton>
            <ToggleButton value="state" aria-label="right aligned">
              <USAIcon />
            </ToggleButton>
            <ToggleButton value="germany" aria-label="germany icon">
              <GermanyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </>
  );
}
