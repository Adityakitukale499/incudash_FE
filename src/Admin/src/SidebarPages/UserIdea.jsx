import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { loaderContext } from "../ContextApi/context";
import { getData } from "../Services/api";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import ViewIdea from "../Components/Pages/ViewIdea";

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

const GetStep = ({ id }) => {
  const stages = [
    "StartUp Stage",
    "Validate Idea",
    "Product Roadmap",
    "Financial Valuation Validation",
    "Pitch Deck Validation",
    "Raise Funding",
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    getData(`ideas/findByUserId/${id}`)
      .then((e) => setStep(e.data.stepNum))
      .catch((e) => console.log(e));
  }, []);
  return <>{stages[step]}</>;
};

const UserIdea = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [finalUsersList, setFinalUsersList] = useState([]);
  // const { loader, setLoader } = useContext(loaderContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      setFinalUsersList([]);
      return;
    }
    const filterData = users.filter(
      (e) =>
        e?.name?.firstName?.includes(search) ||
        e?.name?.lastName?.includes(search) ||
        e?.email?.includes(search) ||
        e?.phoneNumber?.includes(search)
    );
    setFinalUsersList(filterData);
  };
  useEffect(() => {
    // setLoader(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:1337/users");
        setUsers(response.data);
        setFinalUsersList(response.data);
        console.log(response.data);
        // setLoader(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // setLoader(false);
      }
    };
    fetchUsers();
  }, []);

  const userTableHeadings = [
    "User Name",
    "Email",
    "Created At",
    "Current Step",
    " ",
  ];
  const navigate = useNavigate();

  return (
    <Box>
      {!userId ? (
        <>
          <Typography variant="h4" pb={1}>
            Users Idea
          </Typography>
          <hr />
          <Box sx={{ display: "flex", justifyContent: "end", gap: 1, py: 2 }}>
            <input
              type="text"
              placeholder="search here..."
              style={{ outline: "none", padding: "5px" }}
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
            >
              <TableHead>
                <TableRow>
                  {userTableHeadings.map((item) => (
                    <TableCell align="center" key={item}>
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
                ).map((item, index) => (
                  <TableRow
                    key={`row${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {item?.name?.firstName} {item?.name?.lastName}
                    </TableCell>

                    <TableCell align="center">{item?.email}</TableCell>

                    <TableCell align="center">
                      {item?.createdAt
                        ? dayjs(item?.createdA).format("DD/MM/YYYY")
                        : "-"}
                    </TableCell>

                    <TableCell align="center">
                      {/* {stages[idea[index]?.stepNum]} */}
                      <GetStep id={item.id} />
                    </TableCell>

                    <TableCell align="center">
                      {/* <Button onClick={() => navigate(`/idea/${item._id}`)}> */}
                      <Button onClick={()=> setUserId(item._id)}>
                        View Idea
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    // colSpan={3}
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
        </>
      ) : (
        <ViewIdea userId={userId} />
      )}
    </Box>
  );
};

export default UserIdea;
