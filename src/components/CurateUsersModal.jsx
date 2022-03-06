import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Button from "@mui/material/Button";
import CurateUsersTable from "./CurateUsersTable";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const postUserUrl = import.meta.env.VITE_POST_USER_URL;

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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#121212",
  color: "#ffffff",
  p: 2,
  px: 4,
  pb: 3,
};

const buttonStyle = {
  width: "100%",
  marginTop: "20px",
};

export default function CurateUsersModal({
  setCurateUserModalState,
  curateUserModalState,
  setCuratedUsers,
  curatedUsers,
}) {
  const { user } = useAuth0();

  const [localCuratedUsers, setLocalCuratedUsers] = useState([]);

  useEffect(() => {
    console.log({
      curatedUsers,
      localCuratedUsers,
    });
    setLocalCuratedUsers(curatedUsers);
  }, []);

  useEffect(() => {
    console.log({
      curatedUsers,
      localCuratedUsers,
    });
    setLocalCuratedUsers(curatedUsers);
  }, [curatedUsers]);

  const closeModal = () => {
    setLocalCuratedUsers(curatedUsers);
    setCurateUserModalState(false);
  };

  const done = async () => {
    setCuratedUsers(localCuratedUsers);
    closeModal();

    await fetch(postUserUrl, {
      method: "POST",
      body: JSON.stringify({
        user: user.given_name,
        // user: "Bowser",
        // user: "Mario",
        feed: localCuratedUsers,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <StyledModal
        aria-labelledby="curate-users-modal-title"
        aria-describedby="curate-users-modal-description"
        open={curateUserModalState}
        onClose={closeModal}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <CurateUsersTable
            localCuratedUsers={localCuratedUsers}
            setLocalCuratedUsers={setLocalCuratedUsers}
          />
          {localCuratedUsers && (
            <Button
              style={buttonStyle}
              onClick={() => done()}
              variant="contained"
            >
              Done
            </Button>
          )}
          {!localCuratedUsers && (
            <Button
              style={buttonStyle}
              onClick={() => closeModal()}
              variant="contained"
            >
              Ok
            </Button>
          )}
        </Box>
      </StyledModal>
    </div>
  );
}
