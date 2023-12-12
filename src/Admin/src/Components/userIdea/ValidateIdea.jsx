import { Accordion, AccordionSummary, Box, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import App from "../comments/src/App";
import { useContext, useEffect, useState } from "react";
import { putData } from "../../Services/api";
import CommentsModal from "../../../../Components/CommentsModal";
import { ideaContext } from "../../../../contextApi/context";

const ValidateIdea = ({ idea, currentUser }) => {
  const { loader, setLoader } = useContext(ideaContext);
  const [comments, setComments] = useState([]);
  const validateIdeaTable = ["Type", "url"];
  const [expanded, setExpanded] = useState(true);
  const [commentsModal, setCommentsModal] = useState(false)

  useEffect(() => {
    if (idea?.validateIdea?.comments) {
    //   console.log(idea?.validateIdea?.comments);
      setComments(idea?.validateIdea?.comments);
    }
  }, [idea]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    // console.log(comments);
    const body = {
      validateIdea: {
        ideaText: idea?.validateIdea?.ideaText,
        refrenceLinkArray: idea?.validateIdea?.refrenceLinkArray,
        attachments: idea?.validateIdea?.attachments,
        comments: updatedComments,
      },
    };
    if(!idea?.userId) return;

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
      <Typography sx={{ textAlign: "center", mt: 2, mb: 2 }}>
        Idea Text
      </Typography>

      <Typography>{idea?.validateIdea?.ideaText}</Typography>

      <Typography sx={{ textAlign: "center", m: 2 }}>Attachments</Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "1rem" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {validateIdeaTable.map((item) => (
                <TableCell align="center" key={`ideaHead${item}`}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {idea?.validateIdea?.attachments?.map((item, index) => (
              <TableRow
                key={`idearow${index}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{item?.type}</TableCell>

                <TableCell align="center">{item?.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography sx={{ textAlign: "center", m: 2 }}>Refrence Links</Typography>
      <Box
        sx={{
          display: "flex",
          // justifyContent: "start",
          // flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
          gap: 1,
        }}
        component="ul"
      >
        {idea?.validateIdea?.refrenceLinkArray?.map((item, index) => (
          <Chip key={`chip${index}`} label={item.refrerenceLink} />
        ))}
      </Box>
      <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
            Comments
          </Typography>
        <CommentsModal open={commentsModal} setOpen={setCommentsModal} comments={comments}
              currentUser={currentUser}
              setComments={handleComments}/>
              
          <img  onClick={()=> setCommentsModal(true)} src='/commentButton.png' alt="image" style={{width:'170px'}}/>
      {/* <Accordion
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
        sx={{ p: 0.5, borderRadius: 1, mt: 2 }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
         
        </AccordionSummary>
      </Accordion> */}
    </Box>
  );
};

export default ValidateIdea;
