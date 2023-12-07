import { AccordionDetails, Box, Button, Chip, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import QuillEditor from "../QuillEditor";
import { useContext, useEffect, useState } from "react";
import { putData } from "../../Services/api";
import { loaderContext } from "../../ContextApi/context";

const RaiseFunding = ({ idea }) => {
  //   const raiseFundingTable = [
  //     "Funding Formatted Text",
  //     "Created By",
  //     "Created At",
  //     "Last Updated By",
  //   ];
  const [massage, setMassage] = useState("");

  const { loader, setLoader } = useContext(loaderContext);
  useEffect(() => {
    if (idea?.raiseFunding?.fundingFormattedText) {
      setMassage(idea?.raiseFunding?.fundingFormattedText);
    }
  }, [idea]);
  const updateMassage = () => {
    const body = {
      raiseFunding: {
        fundingFormattedText: massage,
        updated_at: new Date(),
      },
    };
    setLoader(true);
    putData(`ideas/updateByUserId/${idea?.userId}`, body)
      .then((data) => {
        // console.log(data.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
    console.log(idea);
  };
  return (
    <Box p={5}>
      <Typography sx={{ textAlign: "center", mb: 2 }}>
        Funding Formatted Text
      </Typography>

      <QuillEditor code={massage} setCode={setMassage} />
      <Box display={"flex"} justifyContent={"end"} mt={10}>
        <Button variant="contained" onClick={updateMassage}>
          add massage
        </Button>
      </Box>
      {/* <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "1rem" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {raiseFundingTable.map((item) => (
                <TableCell align="center" key={`raisefundHead${item}`}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={`raisefundrow${idea?.raiseFunding?._id}`}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="center">
                {idea?.raiseFunding?.fundingFormattedText}
              </TableCell>

              <TableCell align="center">
                {idea?.raiseFunding?.createdBy}
              </TableCell>

              <TableCell align="center">
                {idea?.raiseFunding?.created_at}
              </TableCell>

              <TableCell align="center">
                {idea?.raiseFunding?.lastUpdatedBy}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
};

export default RaiseFunding;
