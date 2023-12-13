import { useState, useEffect, useContext } from "react";
import { Accordion, AccordionSummary, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getData, putData } from "../../services/api";
import CommentsModal from "../../../../Components/CommentsModal";
import { ideaContext } from "../../../../contextApi/context";

const StartupStage = ({ idea, currentUser }) => {
  const { loader, setLoader } = useContext(ideaContext);
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [commentsModal , setCommentsModal] = useState(false)

  useEffect(() => {
    if (idea?.startupStage?.comments) {
    //   console.log(idea?.startupStage?.comments);
      setComments(idea?.startupStage?.comments);
    }
  }, [idea]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleComments = (updatedComments) => {
    // console.log(updatedComments);
    const body = {
      startupStage: {
        industry: idea?.startupStage?.industry,
        stage: idea?.startupStage?.stage,
        comments: updatedComments,
      },
    };
    
    if(!idea?.userId) return;
    setLoader(true);
    putData(`ideas/updateByUserId/${idea?.userId}`, body)
      .then((data) => {
        // console.log(data.data, "startup stage");
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  };
  return (
    <Box p={5}>
      <div>Stage : {idea?.startupStage?.stage}</div>
      <div>Industry : {idea?.startupStage?.industry}</div>
      
 <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
            Comments
          </Typography>
        <CommentsModal open={commentsModal} setOpen={setCommentsModal} comments={comments}
              currentUser={currentUser}
              setComments={handleComments}/>
              
          <img  onClick={()=> setCommentsModal(true)} src='/commentButton.png' alt="image" style={{width:'170px'}}/>
    </Box>
  );
};

export default StartupStage;
