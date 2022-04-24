import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Grid } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import PublicIcon from "@mui/icons-material/Public";
import { USAIcon } from "../../assets/icons/USAIcon";

import { styled, Box } from "@mui/system";

const colors = ["#2ECC71", "#F1C40F", "#7F8C8D"];

export default function ToggleFeed({ toggleState, setToggleState }) {
  const [alignment, setAlignment] = useState(toggleState.word);

  useEffect(() => {
    let option;
    for (const [key, value] of Object.entries(toggleState)) {
      if (value) {
        option = key;
      }
    }
    console.log({ toggleState, option });
    setAlignment(option);
  }, []);

  const handleAlignment = (event, newAlignment) => {
    console.log(newAlignment);
    setAlignment(newAlignment);

    if (newAlignment === "word") {
      setToggleState({
        word: true,
        world: false,
        state: false,
      });
    }
    if (newAlignment === "world") {
      setToggleState({
        word: false,
        world: true,
        state: false,
      });
    }
    if (newAlignment === "state") {
      setToggleState({
        word: false,
        world: false,
        state: true,
      });
    }
  };

  const WLetterBox = styled("span")({
    fontSize: toggleState.word ? "10px" : "6px",
    padding: toggleState.word ? "2px 4px" : "1px 2px",
    fontWeight: 600,
    marginRight: "2px",
  });

  return (
    <>
      <Grid container sx={{ maxWidth: "300px" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "18px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                paddingRight: "6px",
                marginBottom: toggleState.word ? "3.25px" : "2px",
              }}
            >
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
            /
            <span
              style={{
                color: toggleState.world ? "#FFF" : "#999",
                fontSize: toggleState.world ? "14px" : "10px",
                fontWeight: toggleState.world ? 700 : 400,
                paddingTop: "6px",
                paddingLeft: "6px",
                paddingRight: "6px",
              }}
            >
              WOR
              <span style={{ color: "green" }}>L</span>DLE
            </span>{" "}
            /
            <span
              style={{
                color: toggleState.state ? "#FFF" : "#999",
                fontSize: toggleState.state ? "14px" : "10px",
                fontWeight: toggleState.state ? 700 : 400,
                paddingTop: "6px",
                paddingLeft: "6px",
              }}
            >
              <span style={{ color: "green" }}>STATE</span>LE
            </span>{" "}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
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
            {/* <ToggleButton value="justify" aria-label="justified" disabled>
      <FormatAlignJustifyIcon />
    </ToggleButton> */}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </>
  );
}
