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
  setDontShowUsersList,
  persistNewDontShowUsersList,
  dontShowUsersList,
  allUsers,
}) {
  const { user } = useAuth0();

  const [localModalCuratedUsers, setLocalModalCuratedUsers] = useState([]);

  useEffect(() => {
    setLocalModalCuratedUsers(dontShowUsersList);
  }, []);

  useEffect(() => {
    setLocalModalCuratedUsers(dontShowUsersList);
  }, [dontShowUsersList]);

  const closeModal = () => {
    setLocalModalCuratedUsers(dontShowUsersList);
    setCurateUserModalState(false);
  };

  const done = async () => {
    persistNewDontShowUsersList(localModalCuratedUsers);
    setDontShowUsersList(localModalCuratedUsers);

    closeModal();

    await fetch(postUserUrl, {
      method: "POST",
      body: JSON.stringify({
        user: import.meta.env.VITE_USER || user.given_name,
        dontShowUsers: localModalCuratedUsers,
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
            allUsers={allUsers}
            localModalCuratedUsers={localModalCuratedUsers}
            setLocalModalCuratedUsers={setLocalModalCuratedUsers}
          />
          {localModalCuratedUsers && (
            <Button
              style={buttonStyle}
              onClick={() => done()}
              variant="contained"
            >
              Done
            </Button>
          )}
          {!localModalCuratedUsers && (
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
