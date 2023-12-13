import { useState, useEffect, useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  ListItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getData, putData } from "../../services/api";
import dayjs from "dayjs";
// import App from "../comments/src/App";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentsModal from "../../../../Components/CommentsModal";
import { ideaContext } from "../../../../contextApi/context";
import { ShowFullMessageModal } from "../Modals/ShowFullMessageModatl";

const ProductRoadmap = ({ idea, currentUser }) => {
  const roadmapTable = ["Title", "Description", "Start Time", "End Time"];

  const { loader, setLoader } = useContext(ideaContext);
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [commentsModal, setCommentsModal] = useState(false)
  const [mgsModal , setMgsModal] = useState(false)
  const [mgs , setMgs] = useState('')


  useEffect(() => {
    if (idea?.productRoadmap?.comments) {
    //   console.log(idea?.productRoadmap?.comments);
      setComments(idea?.productRoadmap?.comments);
    }
  }, [idea]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    const body = {
      productRoadmap: {
        roadMapCollection: idea?.productRoadmap?.roadMapCollection,
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

  const handleDescription =(discription)=>{
    setMgs(discription)
    setMgsModal(true)
  }

  return (
    <Box p={5}>
      <ShowFullMessageModal open={mgsModal} setOpen={setMgsModal} message={mgs}/>
      <Typography sx={{ textAlign: "center", mt: 3, mb: 2 }}>
        Roadmap
      </Typography>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "1rem" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {roadmapTable.map((item) => (
                <TableCell key={`roadmapheadaa${item}`} align="center">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {idea?.productRoadmap?.roadMapCollection.map((item, index) => (
              <TableRow
                key={`Roadmaprow${index}`}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{item.roadmapTitle}</TableCell>

                <TableCell align="center">
                  {item.description.slice(0, 50)}{" "}
                  {item.description.length > 50 && (
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => handleDescription(item.description)}
                    >
                      {" "}
                      view more
                    </span>
                  )}
                </TableCell>

                <TableCell align="center">
                  {item.timestampFrom
                    ? dayjs(item.timestampTo).format("DD/MM/YYYY")
                    : "-"}
                </TableCell>

                <TableCell align="center">
                  {item.timestampTo
                    ? dayjs(item.timestampTo).format("DD/MM/YYYY")
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
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
      
      expandIcon={<ExpandMoreIcon />}
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

export default ProductRoadmap;
