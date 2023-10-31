import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { ideaContext } from "../../contextApi/context";
import NavigateBtn from "../NavigateBtn";
import { Badge } from "@mui/joy";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VideocamIcon from "@mui/icons-material/Videocam";
import DescriptionIcon from "@mui/icons-material/Description";
import { putData } from "../../servises/apicofig";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Conformation from "../Confirmation";
import PreviewIcon from "@mui/icons-material/Preview";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Step2 = () => {
  const {
    idea,
    setIdea,
    loader,
    setLoader,
    successMgs,
    faildMgs,
    stepNum,
    setstepNum,
  } = useContext(ideaContext);
  const [comment, setComment] = useState({
    createAt: "12-12-2012",
    commentText: "comment by aditya kitukale",
    createdBy: "aditya kitukale",
  });
  const [textSize, setTextSize] = useState(0);
  const [ideaText, setIdeaText] = useState();
  const [refrence, setRefrence] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [chipData, setChipData] = useState([
    { refrerenceLink: "www.google.com" },
  ]);
  const [deleteAttachmentModal, setdeleteAttachmentModal] = useState(false);
  const deleteAttachmentRef = useRef();

  useEffect(() => {
    if (idea) {
      setIdeaText(idea.validateIdea.ideaText);
      setChipData(idea.validateIdea.refrenceLinkArray);
      setAttachments(idea.validateIdea.attachments);
    }
  }, [idea]);

  useEffect(() => {
    if (idea) {
      setUpdate(idea.validateIdea.ideaText !== ideaText);
    }
  }, [ideaText]);

  useEffect(() => {
    setTextSize(ideaText?.length);
  }, [ideaText]);

  const saveStep2 = () => {
    const body = {
      validateIdea: {
        ideaText: ideaText,
        refrenceLinkArray: [
          // ...idea.validateIdea.refrenceLinkArray,
          ...chipData,
        ],
        attachments: [...attachments],
        comments: [...idea.validateIdea.comments, comment],
      },
      stepNum: stepNum == 1 ? 2 : idea.stepNum,
    };
    setLoader(true);
    putData("652f8bff127bd15a1883f5fd", body)
      .then((data) => {
        // console.log('step2putreqest',data.data);
        setIdea(data.data);
        setIdeaText("");
        setChipData([]);
        successMgs();
        setLoader(false);
        if (stepNum == 1) setstepNum(2);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
        faildMgs();
      });
  };

  const saveAndNext = () => {
    if (textSize >= 500 && chipData.length > 0 && update) saveStep2();

    navigate("/dashboard/step3");
  };

  const handleAttachments = (file) => {
    setAttachments([...attachments, { type: file.type, url: file.name }]);
  };

  const handledeleteAttachment = (id) => {
    const filterAttachment = attachments.filter(
      (e) => e.id !== deleteAttachmentRef.current
    );
    setAttachments(filterAttachment);
  };

  const handleIdeaText = (event) => {
    setIdeaText(event.target.value);
    setTextSize(event.target.value.length);
  };

  const handleRefrence = () => {
    setChipData([...chipData, { refrerenceLink: refrence }]);
    setRefrence("");
  };

  const handledeletee = (chipIndex) => () => {
    const filterData = chipData.filter((chip, index) => index !== chipIndex);
    setChipData(filterData);
    console.log(filterData);
  };
  return (
    <Box sx={{ p: 0, mr: -3 }}>
      <Conformation
        open={deleteAttachmentModal}
        setOpen={setdeleteAttachmentModal}
        setConform={handledeleteAttachment}
        massage={"Do you want to delete this Attachment?"}
      />
      <Typography variant="body1" color="initial" sx={{ fontWeight: 600 }}>
        Step 2 - <span style={{ color: "#009aca" }}>Validate Idea</span>
      </Typography>

      <Grid container spacing={4} sx={{ p: 3, mt: 1 }}>
        <Grid
          item
          xs={12}
          md={5.7}
          sx={{ bgcolor: "#fff", borderRadius: 2, m: 1 }}
        >
          <Box sx={{ mt: -3.5, p: 2 }}>
            <Box sx={{ ml: -3 }}>
              <Typography variant="h6" color="initial" sx={{ fontWeight: 600 }}>
                Validation of an Idea
              </Typography>
            </Box>
            <ul>
              <li>
                Pre-Seed Stage/Idea Stage <br />{" "}
                <small>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore ipsam expedita dolorem rerum optio repellendus. Quidem,
                  dolor sed! Eius quis rerum id nihil earum soluta. Reiciendis
                  animi hic eaque quibusdam!
                </small>
              </li>
              <li>
                Seed Stage/Early Stage <br />{" "}
                <small>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore ipsam expedita dolorem rerum optio repellendus. Quidem,
                  dolor sed! Eius quis rerum id nihil earum soluta. Reiciendis
                  animi hic eaque quibusdam!
                </small>
              </li>
              <li>
                Growth Stage/Series Stage <br />{" "}
                <small>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Labore ipsam expedita dolorem rerum optio repellendus. Quidem,
                  dolor sed! Eius quis rerum id nihil earum soluta. Reiciendis
                  animi hic eaque quibusdam!
                </small>
              </li>
            </ul>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5.7}
          sx={{ bgcolor: "#fff", borderRadius: 2, m: 1 }}
        >
          <Box sx={{ mt: -2, pr: 5 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6" color="initial" sx={{ fontWeight: 600 }}>
                What is your startup idea?
              </Typography>
              <Box sx={{ display: "flex", gap: 2, height: 40 }}>
                <Badge badgeContent={"+"} invisible={false}>
                  <Button component="label" variant="contained">
                    <VolumeUpIcon />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleAttachments(e.target.files[0])}
                    />
                  </Button>
                </Badge>
                <Badge badgeContent={"+"} invisible={false}>
                  <Button component="label" variant="contained">
                    <VideocamIcon />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleAttachments(e.target.files[0])}
                    />
                  </Button>
                </Badge>
                <Badge badgeContent={"+"} invisible={false}>
                  <Button component="label" variant="contained">
                    <DescriptionIcon />
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleAttachments(e.target.files[0])}
                    />
                  </Button>
                </Badge>
              </Box>
            </Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontWeight: 550 }}>Attachments</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ mt: -3 }}>
                {attachments.map((e, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      {i + 1}){" "}
                      <PictureAsPdfIcon sx={{ color: "red", fontSize: 12 }} />
                      <span> {e.type} </span>
                    </Box>
                    <Box>
                      <IconButton
                        aria-label="download"
                        // onClick={() => handleDownloadFile(e.url, e.documentId)}
                        sx={{ mt: 0.5 }}
                      >
                        <PreviewIcon sx={{ height: 20 }} />
                      </IconButton>
                      <IconButton
                        aria-label="deletee"
                        onClick={() => {
                          deleteAttachmentRef.current = e.id;
                          setdeleteAttachmentModal(true);
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            <Box>
              <textarea
                name="postContent"
                value={ideaText}
                style={{
                  maxWidth: "100%",
                  width: "100%",
                  height: 200,
                  padding: 10,
                  marginTop: 10,
                }}
                onChange={handleIdeaText}
              />
              <Typography variant="subtitle2">
                <> Add minimum 500 Character </>{" "}
                <span style={{ color: textSize >= 500 ? "green" : "red" }}>
                  {textSize}
                </span>
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontWeight: 550 }}
            >
              References Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
                width: "94%",
              }}
              component="ul"
            >
              {chipData.map((data, index) => (
                <ListItem key={`chip${index}`}>
                  <Chip
                    label={data.refrerenceLink}
                    onDelete={handledeletee(index)}
                  />
                </ListItem>
              ))}
            </Box>
            <Box>
              <TextField
                label="Reference Links"
                variant="standard"
                sx={{ width: "94%", my: 1 }}
                onChange={(e) => setRefrence(e.target.value)}
                value={refrence}
              />
            </Box>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => handleRefrence()}
            >
              Add
            </Button>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                m: 5,
                ml: 0,
              }}
            >
              <Button
                color="neutral"
                sx={{ mr: 2 }}
                onClick={() => navigate("/dashboard")}
              >
                Go To Dashboard
              </Button>
              <Box>
              <Button variant="solid" disabled={textSize < 500 }  sx={{ mr: 2 }} onClick={saveStep2}>Save</Button>
              <Button variant="solid" onClick={saveAndNext}>{textSize< 500 ? null:'Save & '}Next</Button>
              </Box>
            </Box> */}
            <NavigateBtn
              disable={textSize < 500 || !update}
              saveFun={saveStep2}
              saveAndNextFun={saveAndNext}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step2;
