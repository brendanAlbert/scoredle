import { useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
  padding: "20px",
  textAlign: "center",
  p: 6,
  px: 6,
  pb: 6,
};

const textAreaStyle = {
  ...style,
  color: "#333",
};

const placeholderText = "paste svg to convert to data uri";

export default function ModalUnstyledComponent({
  addSvgModalOpen,
  setaddSvgModalOpen,
}) {
  const { user } = useAuth0();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  const closeModal = () => {
    setaddSvgModalOpen(false);
  };

  const handleChange = (e) => {
    let svgInput = e.target.value;
    setSvg(svgInput);
  };

  const handleClick = () => {
    // TODO validate paste svgs
    //   const regex = /#([\d]{1,3})/gim;
    //   const regexBuilder = new RegExp(regex);
    //   let match = regexBuilder.exec(score);
    // if (match) {
    setError(false);

    // Process SVG to get base64 string

    let b64 = `data:image/svg+xml;base64,${window.btoa(svg)}`;

    // Send base64 string to database

    closeModal();
    setSvg("");
    // } else {
    //   setError(true);
    // }
  };

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={addSvgModalOpen}
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
          {/* <DropZone
            setScore={setLocalScore}
            score={score}
            placeholderText={placeholderText}
          /> */}
          <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            maxRows={4}
            value={svg}
            placeholder={placeholderText}
            onChange={(e) => handleChange(e)}
            style={textAreaStyle}
          />
          <br />
          <Button onClick={() => handleClick()} variant="contained">
            Submit Svg
          </Button>
        </Box>
      </StyledModal>
    </div>
  );
}
