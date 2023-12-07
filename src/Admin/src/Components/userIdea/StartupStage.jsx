import { useState, useEffect, useContext } from "react";
import { Accordion, AccordionSummary, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { getData, putData } from "../../Services/api";
import App from "../comments/src/App";
import { loaderContext } from "../../ContextApi/context";

const StartupStage = ({ idea, currentUser }) => {
  const { loader, setLoader } = useContext(loaderContext);
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(true);

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
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ p: 0.5, borderRadius: 1, my: 2 }}
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

export default StartupStage;
