import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { Box } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Conformation from "./Confirmation";
import { useRef } from "react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Roadmap({ sortData, setOpen, setIsEdit, setEditEntry, handledeleteRoadmapstep }) {
  const [expanded, setExpanded] = React.useState("panel1");
  const [deleteMgsModal, setDeleteMgsModal] = useState(false)
  const stepIdRef = useRef()
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleEditBtn=(e, roadmapStep)=>{
    console.log(roadmapStep);
    e.stopPropagation()
    setEditEntry(roadmapStep)
    setIsEdit(true)
    setOpen(true)
  }
  const handledeleteBtn=(e, id)=>{
    e.stopPropagation()
    stepIdRef.current = id
    // const res = confirm()
    // if(res) 
    handledeleteRoadmapstep(id)
  }

  return (
    <>
    <Conformation open={deleteMgsModal} setOpen={setDeleteMgsModal} setConform={handledeleteRoadmapstep} massage={'Do you want to deletee this step?'}/>
      {sortData?.length == 0 && <Box>Data Not Found !</Box>}
      {sortData.map((raodmapStep, i) => (
        <Accordion
          key={i}
          expanded={expanded === `panel${i + 1}`}
          onChange={handleChange(`panel${i + 1}`)}
          sx={{}}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                mb:-0.5
              }}
              variant="body2"
            >
              <span style={{fontWeight:550}}>
                {raodmapStep?.roadmapTitle}
              </span>
              <span style={{marginTop:'-8px'}}>
                <IconButton aria-label="edit" onClick={(e)=> handleEditBtn(e,raodmapStep)} >
                  <EditIcon sx={{fontSize:18}}/>
                </IconButton>
                <IconButton aria-label="delete" onClick={(e)=> handledeleteBtn(e,raodmapStep.id)} >
                  <DeleteIcon sx={{fontSize:18}}/>
                </IconButton>
              </span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Box sx={{ fontSize: 10,fontWeight:500, textAlign:'end' }}>
                  {dayjs(raodmapStep.timestampFrom).format("DD/MM/YYYY")} To {dayjs(raodmapStep.timestampTo).format("DD/MM/YYYY")}
            </Box>
            <Typography variant="caption" sx={{ wordWrap: "break-word" }}>
              {raodmapStep?.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
