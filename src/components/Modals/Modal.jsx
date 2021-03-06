import { useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import DropZone from "./DropZone";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 280,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#444",
  color: "#ffffff",
  p: 2,
  px: 4,
  pb: 3,
};

const placeholderText = "paste your wordle score here";

const darkgraybox = "⬛";
const graybox = "⬜";
const yellowbox = "🟨";
const greenbox = "🟩";

const errorMsgDict = {
  0: "woops! this is for Wordle, not Worldle",
  1: "woops! make sure to paste a valid format",
  2: "woops! this is for Wordle, not Statele",
  3: "woops! this is for Wordle, not Deutschlandle",
};

export default function ModalUnstyledComponent({
  setmodalOpenState,
  modalOpenState,
  handleDropAddScore,
}) {
  const { user } = useAuth0();
  const [score, setLocalScore] = useState("");
  const [error, setError] = useState(false);
  const [errorNumber, setErrorNumber] = useState(-1);

  const closeModal = () => {
    setmodalOpenState(false);
  };

  const handleClick = () => {
    if (score.includes("Worldle")) {
      setError(true);
      setErrorNumber(0);
      return;
    } else if (score.includes("Statele")) {
      setError(true);
      setErrorNumber(2);
      return;
    } else if (score.includes("🇩🇪")) {
      setError(true);
      setErrorNumber(3);
      return;
    }

    let greenboxcount = [...score.matchAll(new RegExp(greenbox, "gim"))].map(
      (a) => a.index
    ).length;
    let yellowboxcount = [...score.matchAll(new RegExp(yellowbox, "gim"))].map(
      (a) => a.index
    ).length;
    let grayboxcount = [...score.matchAll(new RegExp(graybox, "gim"))].map(
      (a) => a.index
    ).length;
    let darkgrayboxcount = [
      ...score.matchAll(new RegExp(darkgraybox, "gim")),
    ].map((a) => a.index).length;

    let count =
      greenboxcount + yellowboxcount + grayboxcount + darkgrayboxcount;

    let match = count % 5 == 0 && count >= 5 && count <= 30;

    if (match) {
      setError(false);
      setErrorNumber(-1);

      let newScoreArray = [];
      let scoreRowArray = [];

      [...score].forEach((character) => {
        if (character == graybox) {
          scoreRowArray.push(0);
          if (scoreRowArray.length == 5) {
            newScoreArray.push(scoreRowArray);
            scoreRowArray = [];
          }
        }

        if (character == darkgraybox) {
          scoreRowArray.push(0);
          if (scoreRowArray.length == 5) {
            newScoreArray.push(scoreRowArray);
            scoreRowArray = [];
          }
        }

        if (character == yellowbox) {
          scoreRowArray.push(1);
          if (scoreRowArray.length == 5) {
            newScoreArray.push(scoreRowArray);
            scoreRowArray = [];
          }
        }

        if (character == greenbox) {
          scoreRowArray.push(2);
          if (scoreRowArray.length == 5) {
            newScoreArray.push(scoreRowArray);
            scoreRowArray = [];
          }
        }
      });

      let wordle = "";

      const regex = /#([\d]{1,3})/gim;
      const regexBuilder = new RegExp(regex);
      let match = regexBuilder.exec(score);
      if (match) {
        wordle = match[0];
      }

      const days_word_regex = /word=([A-Z]){5}/gi;
      const daysWordRegexBuilder = new RegExp(days_word_regex);
      const days_word_match = daysWordRegexBuilder.exec(score);

      handleDropAddScore({
        name: import.meta.env.VITE_USER || user.given_name,
        score: newScoreArray,
        wordle,
        word:
          days_word_match && days_word_match[0].split("=")[1]
            ? days_word_match[0].split("=")[1]
            : undefined,
      });

      closeModal();
      setLocalScore("");
    } else {
      setError(true);
      setErrorNumber(1);
    }
  };

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={modalOpenState}
        onClose={closeModal}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: "bold",
              color: `#ff0000${error ? "ff" : "00"}`,
            }}
          >
            {errorMsgDict[errorNumber]}
          </p>
          <DropZone
            setScore={setLocalScore}
            score={score}
            placeholderText={placeholderText}
          />
          <Button onClick={() => handleClick()} variant="contained">
            Submit Score
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}
