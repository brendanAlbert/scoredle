import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { useMediaQuery, Box } from "@mui/material";

export const Messenger = ({}) => {
  const [showNotice, setShowNotice] = useState(["statele"]);
  let mobile = useMediaQuery(`(max-width: 662px)`);

  const config = {
    url: "https://outflux.net/statele/",
    msg: "New game type feed - ",
    msg2: "Leaderboard updated",
    msg3: "My Stats updated",
    tagText: "Statele",
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
          display: showNotice.indexOf("statele") !== -1 ? "flex" : "none",
        }}
        onClose={() => {
          let newList = showNotice.filter((notice) => notice != "statele");
          setShowNotice(newList);
        }}
        variant="filled"
        severity="success"
      >
        {config.msg}
        &nbsp;
        <a href={config.url} target="_blank">
          {config.tagText}
        </a>
        &nbsp;! &nbsp;
        <br />
        {config.msg2}
        <br />
        {config.msg3}
      </Alert>
    </Box>
  );
};
