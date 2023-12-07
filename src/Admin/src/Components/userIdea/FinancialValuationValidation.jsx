import { useState, useEffect, useContext } from "react";
import { Accordion, AccordionSummary, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import App from "../comments/src/App";
import { loaderContext } from "../../ContextApi/context";
import { putData } from "../../Services/api";

const FinancialValuationValidation = ({ idea, currentUser }) => {
  const [comments, setComments] = useState([]);
  const { loader, setLoader } = useContext(loaderContext);
  const financialValuationTable = ["Document", ""];
  const [expanded, setExpanded] = useState(true);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (idea?.financialValuation?.comments) {
      //   console.log(idea?.financialValuation?.comments);
      setComments(idea?.financialValuation?.comments);
    }
  }, [idea]);

  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    const body = {
      financialValuation: {
        documentCollection: idea?.financialValuation?.documentCollection,
        comments: updatedComments,
      },
    };
    if (!idea?.userId) return;

    setLoader(true);
    putData(`ideas/updateByUserId/${idea?.userId}`, body)
      .then((data) => {
        console.log(data);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  return (
    <Box p={5}>
      <Typography sx={{ textAlign: "center", mt: 3, mb: 2 }}>
        Document Collection
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "1rem" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {financialValuationTable.map((item) => (
                <TableCell align="center" key={`roadmaphead${item}`}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {idea?.financialValuation?.documentCollection?.map(
              (item, index) => (
                <TableRow
                  key={`Roadmaprow${index}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center">{item.documentId}</TableCell>

                  <TableCell align="center">
                    <Button>view document</Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ p: 0.5, borderRadius: 1, mt: 2 }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
            Comments
          </Typography>
        </AccordionSummary>

        <App
          comments={comments}
          currentUser={currentUser}
          setComments={handleComments}
        />
      </Accordion>
    </Box>
  );
};

export default FinancialValuationValidation;
