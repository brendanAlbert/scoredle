import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { useMediaQuery, Box } from "@mui/material";

export const Messenger = ({}) => {
  const [showNotice, setShowNotice] = useState(["deutschlandle"]);
  let mobile = useMediaQuery(`(max-width: 662px)`);

  const config = {
    url: "https://deutschlandle.vercel.app",
    msg: "New game type, ",
    tagText: "Deutschlandle",
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "90px",
        right: "30px",
        left: mobile ? "30px" : null,
      }}
    >
      <Alert
        sx={{
          display: showNotice.indexOf("deutschlandle") !== -1 ? "flex" : "none",
        }}
        onClose={() => {
          let newList = showNotice.filter(
            (notice) => notice != "deutschlandle"
          );
          setShowNotice(newList);
        }}
        variant="filled"
        severity="primary"
      >
        {config.msg}
        &nbsp;
        <a href={config.url} target="_blank">
          {config.tagText}
        </a>
        &nbsp;!
      </Alert>
    </Box>
  );
};
