import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { loaderContext } from "../ContextApi/context";
import { Box, Button, Typography } from "@mui/material";

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getData, postData, putData } from "../Services/api";
import dayjs from "dayjs";
import Confirmation from "../Components/Confirmation";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// hamburger

const options = ["Block User", "Reset Password"];

const ITEM_HEIGHT = 48;

const UsersInformation = () => {
  const [users, setUsers] = useState([]);
  const [finalUsersList, setFinalUsersList] = useState([]);
  const [search, setSearch] = useState("");
  // const { loader, setLoader } = useContext(loaderContext);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const [conModal, setConModal] = useState(false)

  const [page, setPage] = React.useState(0);

  const open = Boolean(anchorEl);
  const handleClick = (event, row) => {
    setSelectedUser(row);
    setAnchorEl(event.currentTarget);
  };
  const resetPassword = () => {
    handleClose();
    console.log(selectedUser?.email);
    const body = {
      email: selectedUser?.email,
    };
    postData("auth/forgot-password", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };
  const blockUser = () => {
    handleClose();

    const body = {
      blocked: true,
    };
    console.log(selectedUser);

    putData(`user/update/${selectedUser?.id}`, body)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - finalUsersList.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchUser = () => {
    if (!search) {
      // setFinalUsersList([]);
      return;
    }
    const filterData = users.filter(
      (e) =>
        e.name.firstName.toLowerCase().includes(search.toLowerCase()) ||
        e.name.lastName.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.phoneNumber.toLowerCase().includes(search.toLowerCase())
    );
    setFinalUsersList(filterData);
  };

  const sortUser = () => {
    const data = finalUsersList.sort((a, b) => a.email - b.email);
    setFinalUsersList(data);
  };

  useEffect(() => {
    // setLoader(true);
    getData("users")
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
        setFinalUsersList(res.data);
        // setLoader(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const userTableHeadings = [
    "FirstName",
    "LastName",
    "Email",
    "Phone Number",
    "Created At",
    "",
  ];

  return (
    <Box >
      <Confirmation
        open={conModal}
        setOpen={setConModal}
        setConform={blockUser}
        massage={"Do you want to block this user?"}
      />
      <Typography variant="h4" pb={1}>
        Users Information
      </Typography>
      <hr />
      <Box sx={{ display: "flex", justifyContent: "end", gap: 1, py: 2 }}>
        <input
          type="text"
          style={{ outline: "none", padding: "5px" }}
          placeholder="search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={searchUser}>
          search
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "1rem" }}
          aria-label="simple table"
          className="table"
        >
          <TableHead>
            <TableRow>
              {userTableHeadings.map((item) => (
                <TableCell align="center" key={`usertable${item}`}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? finalUsersList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : finalUsersList
            ).map((row, index) => (
              <TableRow
                key={`usersrow${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row?.name?.firstName}</TableCell>

                <TableCell align="center">{row?.name?.lastName}</TableCell>

                <TableCell align="center">{row?.email}</TableCell>

                <TableCell align="center">{row?.phoneNumber}</TableCell>

                <TableCell align="center">
                  {row?.createdAt
                    ? dayjs(row?.createdA).format("DD/MM/YYYY")
                    : "-"}
                </TableCell>
                <TableCell align="left">
                  {
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, row)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "20ch",
                          },
                        }}
                      >
                        <MenuItem onClick={()=> setConModal(true)}>Block User</MenuItem>
                        <MenuItem onClick={resetPassword}>
                          Reset Password
                        </MenuItem>
                      </Menu>
                    </div>
                  }
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                // colSpan={4}
                count={finalUsersList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersInformation;
