import { useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import DropZone from "./DropZone";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { DirectionCharacterList } from "../../constants/constants";
import { DirectionCharacterToNumberMap } from "../../constants/constants";

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

const placeholderText = "add worldle score";

export default function WorldleModal({
  setWorldleModalOpenState,
  worldleModalOpenState,
  handleWorldleAddScore,
}) {
  const { user } = useAuth0();
  const [score, setLocalScore] = useState("");
  const [error, setError] = useState(false);

  const closeModal = () => {
    setWorldleModalOpenState(false);
  };

  const handleClick = () => {
    const darkgraybox = "⬛";
    const graybox = "⬜";
    const yellowbox = "🟨";
    const greenbox = "🟩";

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

      let worldle = "";

      const regex = /#([\d]{1,3})/gim;
      const regexBuilder = new RegExp(regex);
      let match = regexBuilder.exec(score);
      if (match) {
        worldle = match[0];
      }

      const country_svg_regex = /svg=([A-Z:/.])+/gi;
      const countrySvgRegexBuilder = new RegExp(country_svg_regex);
      const svg_url_match = countrySvgRegexBuilder.exec(score);

      const country_regex = /country=([A-Z\s])+/gi;
      const countryRegexBuilder = new RegExp(country_regex);
      const country_match = countryRegexBuilder.exec(score);

      handleWorldleAddScore({
        name: import.meta.env.VITE_USER || user.given_name,
        worldleScore: newScoreArray,
        worldle,
        country:
          country_match && country_match[0].split("=")[1]
            ? country_match[0].split("=")[1]
            : undefined,
        svg:
          svg_url_match && svg_url_match[0]?.split("=")[1]
            ? svg_url_match[0]?.split("=")[1]
            : undefined,
      });

      closeModal();
      setLocalScore("");
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={worldleModalOpenState}
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
            woops! make sure to paste a valid format
          </p>
          <DropZone
            setScore={setLocalScore}
            score={score}
            placeholderText={placeholderText}
          />
          <Button onClick={() => handleClick()} variant="contained">
            Submit Worldle Score
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}
