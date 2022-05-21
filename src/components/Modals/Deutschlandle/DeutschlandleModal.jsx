import { useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import DropZone from "../DropZone";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { DirectionCharacterList } from "../../../constants/constants";
import { DirectionCharacterToNumberMap } from "../../../constants/constants";

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

const placeholderText = "add deutschlandle score";
const submitText = "Add Deutschlandle Score";

const darkgraybox = "⬛";
const graybox = "⬜";
const yellowbox = "🟨";
const greenbox = "🟩";

const errorMsgDict = {
  0: "woops! this is for Deutschlandle",
  1: "woops! make sure to paste a valid format",
};

export default function DeutschlandleModal({
  setDeutschlandleModalOpenState,
  deutschlandleModalOpenState,
  handleDeutschlandleAddScore,
}) {
  const { user } = useAuth0();
  const [score, setLocalScore] = useState("");
  const [error, setError] = useState(false);
  const [errorNumber, setErrorNumber] = useState(-1);

  const closeModal = () => {
    setDeutschlandleModalOpenState(false);
  };

  const handleClick = () => {
    if (score.match(/worl?dle|statele/gi)) {
      setError(true);
      setErrorNumber(0);
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
        if (character == graybox || character == darkgraybox) {
          scoreRowArray.push(0);
        }

        if (character == yellowbox) {
          scoreRowArray.push(1);
        }

        if (character == greenbox) {
          scoreRowArray.push(2);
        }

        if (DirectionCharacterList.includes(character)) {
          scoreRowArray.push(DirectionCharacterToNumberMap[character]);
        }

        if (scoreRowArray.length == 6) {
          newScoreArray.push(scoreRowArray);
          scoreRowArray = [];
        }
      });

      let deutschlandle = "";

      const regex = /#([\d]{1,2})/gim;
      const regexBuilder = new RegExp(regex);
      let match = regexBuilder.exec(score);
      if (match) {
        deutschlandle = match[0];
      }

      const de_svg_regex = /svg=([A-Z:/.])+/gi;
      const deSvgRegexBuilder = new RegExp(de_svg_regex);
      const svg_url_match = deSvgRegexBuilder.exec(score);

      const de_regex = /state=([\D- ])+/gi;
      const deRegexBuilder = new RegExp(de_regex);
      const de_state_match = deRegexBuilder.exec(score);

      handleDeutschlandleAddScore({
        name: import.meta.env.VITE_USER || user.given_name,
        de_score: newScoreArray,
        deutschlandle,
        de_state:
          de_state_match && de_state_match[0].split("=")[1]
            ? de_state_match[0].split("=")[1]
            : undefined,
        de_svg:
          svg_url_match && svg_url_match[0]?.split("=")[1]
            ? svg_url_match[0]?.split("=")[1]
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
        open={deutschlandleModalOpenState}
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
            {submitText}
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}
