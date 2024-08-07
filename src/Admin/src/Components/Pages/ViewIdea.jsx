import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { AccordionDetails, Box, Chip, ListItem } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { getData } from "../../services/api";

import StartupStage from "../userIdea/StartupStage";
import ValidateIdea from "../userIdea/ValidateIdea";
import ProductRoadmap from "../userIdea/ProductRoadmap";
import FinancialValuationValidation from "../userIdea/FinancialValuationValidation";
import PitchDeckValidation from "../userIdea/PitchDeckValidation";
import RaiseFunding from "../userIdea/RaiseFunding";
import { ideaContext } from "../../../../contextApi/context";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1.4rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const ViewIdea = ({userId}) => {
  const { loader, setLoader } = useContext(ideaContext);
  // const { userId } = useParams();
  const [idea, setIdea] = useState({});
  const [user, setUser] = useState({});
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [massage, setMassage] = useState("");
  const [currentUser, setCurrentUser] = useState({
    userName: "Priyanka Madnani",
    userId: "123456789",
  });

  const handleDescription = (mgs) => {
    setMassage(mgs);
    setOpen(true);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (userId) {
      setLoader(true);
      getData(`ideas/findByUserId/${userId}`)
        .then((res) => {
          setIdea(res.data);
          setLoader(false);
        })
        .catch((e) => console.log(e));

      setLoader(true);
      getData(`users/${userId}`)
        .then((res) => {
          setUser(res?.data);
          setLoader(false);
        })
        .catch((e) => console.log(e));
    }
  }, [userId]);

  const pitchDeckValidationTable = ["Document", ""];
  const commentsTable = ["Comment", "Created By", "Created At"];

  return (
    <>
      <Typography variant="h4" pb={1}>
        User Idea Details
      </Typography>
      <hr />
      <Box sx={{ gap: 1, py: 2 }}>
        <Box>
          <Typography variant="body1" color="initial">
            <span style={{ fontWeight: 700 }}>Username :</span>{" "}
            {user?.name?.firstName} {user?.name?.lastName}
          </Typography>
          <Typography variant="body1" color="initial">
            <span style={{ fontWeight: 700 }}>Email :</span> {user?.email}{" "}
          </Typography>
          <Typography variant="body1" color="initial">
            <span style={{ fontWeight: 700 }}>Current Step :</span>{" "}
            {idea?.stepNum}{" "}
          </Typography>
        </Box>
      </Box>
      <div className="Accordion">
        <Box sx={{ boxShadow: 3, marginTop: 1, borderRadius: 1 }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{ p: 0.5, borderRadius: 1 }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                Startup Stage
              </Typography>
            </AccordionSummary>
            <StartupStage idea={idea} currentUser={currentUser} />
          </Accordion>
        </Box>
      </div>
      <div className="Accordion">
        <Box sx={{ boxShadow: 3, marginTop: 1, borderRadius: 1 }}>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{ p: 0.5, borderRadius: 1 }}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                Validate Idea
              </Typography>
            </AccordionSummary>
            <ValidateIdea idea={idea} currentUser={currentUser} />
          </Accordion>
        </Box>
      </div>
      <div className="Accordion">
        <Box sx={{ boxShadow: 3, marginTop: 1, borderRadius: 1 }}>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{ p: 0.5, borderRadius: 1 }}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                Product Roadmap
              </Typography>
            </AccordionSummary>
            <ProductRoadmap idea={idea} currentUser={currentUser} />
          </Accordion>
        </Box>
      </div>
      <div className="Accordion">
        <Box sx={{ boxShadow: 3, marginTop: 1, borderRadius: 1 }}>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{ p: 0.5, borderRadius: 1 }}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                Financial Valuation Validation
              </Typography>
            </AccordionSummary>
            <FinancialValuationValidation
              idea={idea}
              currentUser={currentUser}
            />
          </Accordion>
        </Box>
      </div>
      <div className="Accordion">
        <Box sx={{ boxShadow: 3, marginTop: 1, borderRadius: 1 }}>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
            sx={{ p: 0.5, borderRadius: 1 }}
          >
            <AccordionSummary
              aria-controls="panel5d-content"
              id="panel5d-header"
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                Pitch Deck Validation
              </Typography>
            </AccordionSummary>
            <PitchDeckValidation idea={idea} currentUser={currentUser} />
          </Accordion>
        </Box>
      </div>
      <div className="Accordion">
        <Box sx={{ boxShadow: 3, marginTop: 1, borderRadius: 1 }}>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
            sx={{ p: 0.5, borderRadius: 1 }}
          >
            <AccordionSummary
              aria-controls="panel6d-content"
              id="panel6d-header"
            >
              <Typography sx={{ fontSize: "20px", fontWeight: "400" }}>
                Raise Funding
              </Typography>
            </AccordionSummary>
            <RaiseFunding idea={idea} />
          </Accordion>
        </Box>
        {/* <ShowFull open={open} setOpen={setOpen} massage={massage} /> */}
      </div>
    </>
  );
};

export default ViewIdea;
