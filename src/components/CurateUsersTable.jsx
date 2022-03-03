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
import { guid } from "../helpers/helpers";

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function CurateUsersTable({ curatedUsers, setCuratedUsers }) {
  const toggleUserShowStatus = (index) => {
    let newUsers = curatedUsers.map((usr, idx) => {
      let showing = index == idx ? !usr.isShowing : usr.isShowing;
      return { name: usr.name, isShowing: showing };
    });
    setCuratedUsers(newUsers);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer
        component={Paper}
        style={{
          padding: "20px",
          height: "400px",
          backgroundImage: "none",
          fontSize: "10px",
        }}
      >
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
            <TableRow>
              <TableCell>User name</TableCell>
              <TableCell align="center">Show user in feed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {curatedUsers.map((row, index) => (
              <TableRow
                key={guid()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleUserShowStatus(index)}
                  align="center"
                >
                  {row.isShowing && (
                    <CheckBoxIcon style={{ color: "#78e08f" }} />
                  )}
                  {!row.isShowing && <CheckBoxOutlineBlankIcon />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
