import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { guid } from "../../helpers/helpers";
import { useEffect, useState } from "react";

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function CurateUsersTable({
  localModalCuratedUsers,
  setLocalModalCuratedUsers,
  allUsers,
}) {
  const [localTableDontShowUsers, setlocalTableDontShowUsers] = useState([]);

  useEffect(() => {
    setlocalTableDontShowUsers(localModalCuratedUsers);
  }, []);

  const toggleUserShowStatus = (name) => {
    let newDontShowUsersList = [];

    if (localTableDontShowUsers.includes(name)) {
      newDontShowUsersList = localTableDontShowUsers?.filter(
        (usr) => name != usr
      );
    } else {
      newDontShowUsersList = [...localTableDontShowUsers, name];
    }

    setlocalTableDontShowUsers(newDontShowUsersList);
    setLocalModalCuratedUsers(newDontShowUsersList);
  };

  const populatedTable = (
    <Table
      sx={{ minWidth: 50, maxHeight: 100 }}
      style={{
        backgroundColor: "#121212",
        padding: "20px",
        height: "200px",
        fontSize: "10px",
      }}
      size="small"
      aria-label="a dense table"
    >
      <TableHead>
        <TableRow style={{ display: "sticky " }}>
          <TableCell>User name</TableCell>
          <TableCell align="center">Show user in feed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allUsers &&
          allUsers.map((userName) => (
            <TableRow
              key={guid()}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell component="th" scope="row">
                {userName}
              </TableCell>
              <TableCell
                style={{ cursor: "pointer" }}
                onClick={() => toggleUserShowStatus(userName)}
                align="center"
              >
                {localTableDontShowUsers &&
                localTableDontShowUsers.some((ldsu) => ldsu == userName) ? (
                  <CheckBoxOutlineBlankIcon />
                ) : (
                  <CheckBoxIcon style={{ color: "#78e08f" }} />
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  const noUsersYetTable = (
    <>
      <h2>Curate User Feed</h2>
      <p>Your user feed will appear here.</p>
    </>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer
        component={Paper}
        style={{
          padding: "20px",
          height: "400px",
          minWidth: "200px",
          backgroundImage: "none",
          fontSize: "10px",
        }}
      >
        {allUsers && allUsers.length > 0 ? populatedTable : noUsersYetTable}
      </TableContainer>
    </ThemeProvider>
  );
}
