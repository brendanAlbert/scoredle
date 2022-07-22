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

const placeholderText = "add statele score";
const submitText = "Add Statele Score";

const darkgraybox = "⬛";
const graybox = "⬜";
const yellowbox = "🟨";
const greenbox = "🟩";

const errorMsgDict = {
  0: "woops! this is for Statele, not ",
  1: "woops! make sure to paste a valid format",
};

export default function StateleModal({
  setStateleModalOpenState,
  stateleModalOpenState,
  handleStateleAddScore,
}) {
  const { user } = useAuth0();
  const [score, setLocalScore] = useState("");
  const [errorGameType, setErrorGameType] = useState("");
  const [error, setError] = useState(false);
  const [errorNumber, setErrorNumber] = useState(-1);

  const closeModal = () => {
    setStateleModalOpenState(false);
  };

  const handleClick = () => {
    const errMatch = score.match(/worl?dle|🇩🇪/gi);
    if (errMatch) {
      setError(true);
      setErrorNumber(0);
      setErrorGameType(errMatch[0]);
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

      let statele = "";

      const regex = /#([\d]{1,3})/gim;
      const regexBuilder = new RegExp(regex);
      let match = regexBuilder.exec(score);
      if (match) {
        statele = match[0];
      }

      const state_svg_regex = /state_svg=([A-Z:/.])+/gi;
      const stateSvgRegexBuilder = new RegExp(state_svg_regex);
      const svg_url_match = stateSvgRegexBuilder.exec(score);

      //   const region_regex = /us_region=((af)|(na)|(sa)|(as)|(cb)|(eu)|(me)|(oc))/gi;
      //   const regionRegexBuilder = new RegExp(region_regex);
      //   const region_match = regionRegexBuilder.exec(score);

      const state_regex = /state=([A-Z ])+/gi;
      const stateRegexBuilder = new RegExp(state_regex);
      const state_match = stateRegexBuilder.exec(score);

      handleStateleAddScore({
        name: import.meta.env.VITE_USER || user.given_name,
        state_score: newScoreArray,
        statele,
        state:
          state_match && state_match[0].split("=")[1]
            ? state_match[0].split("=")[1]
            : undefined,
        // region:
        //   region_match && region_match[0].split("=")[1]
        //     ? region_match[0].split("=")[1]
        //     : undefined,
        state_svg:
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
        open={stateleModalOpenState}
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
            {errorMsgDict[errorNumber] + errorGameType}
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
