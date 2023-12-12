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
import { getData, putData } from "../../Services/api";
// import App from "../comments/src/App";
import CommentsModal from "../../../../Components/CommentsModal";
import { ideaContext } from "../../../../contextApi/context";

const PitchDeckValidation = ({ idea, currentUser }) => {
  const { loader, setLoader } = useContext(ideaContext);
  const [comments, setComments] = useState([]);
  const pitchDeckValidationTable = ["Document", ""];
  const [expanded, setExpanded] = useState(true);
  const [commentsModal, setCommentsModal] = useState(false)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (idea?.pitchDeckValidation?.comments) {
    //   console.log(idea?.pitchDeckValidation?.comments);
      setComments(idea?.pitchDeckValidation?.comments);
    }
  }, [idea]);
  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    const body = {
      pitchDeckValidation: {
        documentCollection: idea?.pitchDeckValidation?.documentCollection,
        comments: updatedComments,
      },
    };
    
    if(!idea?.userId) return;

    setLoader(true);
    putData(`ideas/${idea?.id}`, body)
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
      <Typography sx={{ textAlign: "center", mb: 2 }}>
        Document Collection
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "1rem" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {pitchDeckValidationTable.map((item) => (
                <TableCell align="center" key={`roadmaphead${item}`}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {idea?.pitchDeckValidation?.documentCollection?.map(
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
      <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
            Comments
          </Typography>
         <CommentsModal open={commentsModal} setOpen={setCommentsModal} comments={comments}
              currentUser={currentUser}
              setComments={handleComments}/>
              
          <img  onClick={()=> setCommentsModal(true)} src='/commentButton.png' alt="image" style={{width:'170px'}}/>
      {/* <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ p: 0.5, borderRadius: 1, mt: 2 }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        </AccordionSummary>
          
      </Accordion> */}
    </Box>
  );
};

export default PitchDeckValidation;
