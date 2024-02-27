import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import SelectIndustry from "../SelectIndustry";
import { useNavigate } from "react-router-dom";
import { ideaContext, userContext } from "../../contextApi/context";
import NavigateBtn from "../NavigateBtn";
import { getData, putData } from "../../servises/apicofig";
import CommentsModal from "../CommentsModal";

const Step1 = () => {
  const navigate = useNavigate();
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
  const { user, setUser } = useContext(userContext);
  const [currentUser, setCurrentUser] = useState({
    userName: "aditya kitukale",
    userId: "123456789",
  });
  const [comments, setComments] = useState([]);
  const [commentsModal, setCommentsModal] = useState(false);
  const [stage, setStage] = useState("");
  const [stages, setStages] = useState([
    {
      stageName: "Idea Stage",
      stageImage: "https://incudash.com/ideaStages/idea-stage1.png",
    },
    {
      stageName: "Seed Stage",
      stageImage: "https://incudash.com/ideaStages/idea-stage2.png",
    },
    {
      stageName: "Series Stage",
      stageImage: "https://incudash.com/ideaStages/idea-stage2.png",
    },
  ]);
  const [industry, setIndustry] = useState("");
  useEffect(() => {
    if (idea) {
      // console.log(idea?.startupStage?.comments);
      setComments(idea?.startupStage?.comments);
      setStage(idea?.startupStage?.stage);
      setIndustry(idea?.startupStage?.industry?.split(","));
    }
  }, [idea]);
  

  useEffect(() => {
    if (user?.id && user?.username) {
      setCurrentUser({
        userName: user?.username,
        userId: user?.id,
      });
    }
  }, [user]);

  const saveStep1 = () => {
    const body = {
      startupStage: {
        stage: stage,
        industry: industry.join(","),
        comments: idea?.startupStage?.comments,
      },
      stepNum: stepNum == 0 ? 1 : idea.stepNum,
    };
    setLoader(true);
    putData(`ideas/updateByUserId/${user.id}`, body)
      .then((data) => {
        setLoader(false);
        setIdea(data.data);
        successMgs();
        if (stepNum == 0) setstepNum(1);
      })
      .catch((e) => {
        setLoader(false);
        faildMgs();
        console.log(e);
      });
    setStage("");
    setIndustry("");
  };

  const saveAndNext = () => {
    if (
      stage !== idea?.startupStage?.stage &&
      industry !== idea?.startupStage?.industry
    ) {
      // console.log('step1 save and next');
      saveStep1();
    }
    navigate("/dashboard/step2");
  };

  const handleComments = (updatedComments) => {
    console.log(comments);
    console.log(updatedComments);
    if (!idea?.userId) return;
    const body = {
      startupStage: {
        industry: idea?.startupStage?.industry,
        stage: idea?.startupStage?.stage,
        comments: updatedComments,
      },
    };

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
    <>
      <Box sx={{ p: 0, mr: -3 }}>
        <Typography variant="body1" color="initial" sx={{ fontWeight: 600 }}>
          Step 1 - <span style={{ color: "#009aca" }}>Stage of a StartUp</span>
        </Typography>

        <Grid container spacing={4} sx={{ p: 2, mt: 1 }}>
          <Grid
            item
            xs={12}
            md={5.7}
            sx={{ bgcolor: "#fff", borderRadius: 2, m: 1 }}
          >
            <Box sx={{ mt: -3.5, p: 2 }}>
              <Box sx={{ ml: -3 }}>
                <Typography
                  variant="h6"
                  color="initial"
                  sx={{ fontWeight: 550 }}
                >
                  Stage of a StartUp
                </Typography>
                <iframe
                  style={{ marginTop: 25 }}
                  width="100%"
                  height="260px"
                  src="https://www.youtube.com/embed/xLheuIDOWEw?si=J3Ox3ZZHdBvSsBGP"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </Box>
              <ul>
                <li>
                  Pre-Seed Stage/Idea Stage <br />{" "}
                  <small>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore ipsam expedita dolorem rerum optio repellendus.
                    Quidem, dolor sed! Eius quis rerum id nihil earum soluta.
                    Reiciendis animi hic eaque quibusdam!
                  </small>
                </li>
                <li>
                  Seed Stage/Early Stage <br />{" "}
                  <small>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore ipsam expedita dolorem rerum optio repellendus.
                    Quidem, dolor sed! Eius quis rerum id nihil earum soluta.
                    Reiciendis animi hic eaque quibusdam!
                  </small>
                </li>
                <li>
                  Growth Stage/Series Stage <br />{" "}
                  <small>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore ipsam expedita dolorem rerum optio repellendus.
                    Quidem, dolor sed! Eius quis rerum id nihil earum soluta.
                    Reiciendis animi hic eaque quibusdam!
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
              <Typography variant="h6" color="initial" sx={{ fontWeight: 550 }}>
                Select the stage of your StartUp
              </Typography>
              <Grid container spacing={3} sx={{ mt: 0.1 }}>
                {stages?.map((e, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card
                      sx={{
                        Width: 90,
                        borderColor: "#fe6508",
                        textAlign: "center",
                        border:
                          stage == e?.stageName
                            ? "1px solid #009aca"
                            : "0px solid grey",
                      }}
                      onClick={() => setStage(e?.stageName)}
                    >
                      <CardActionArea>
                        <img
                          src={e.stageImage}
                          alt="img"
                          style={{ height: 50 }}
                        />
                        <Box
                          sx={{
                            color: stage == e.stageName ? "#009aca" : "grey",
                          }}
                        >
                          {e.stageName}
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="body1"
                color="initial"
                sx={{ fontWeight: 550 }}
              >
                Select your Industry.
              </Typography>
              <SelectIndustry industry={industry} setIndustry={setIndustry} />
              <NavigateBtn
                disable={
                  stage === idea?.startupStage?.stage
                    ? industry?.toString() ===
                      idea?.startupStage?.industry.toString()
                      ? true
                      : false
                    : false
                }
                saveFun={saveStep1}
                saveAndNextFun={saveAndNext}
              />
            </Box>
          </Grid>
        </Grid>
        <CommentsModal
          open={commentsModal}
          setOpen={setCommentsModal}
          comments={comments}
          currentUser={currentUser}
          setComments={handleComments}
        />

        <img
          onClick={() => setCommentsModal(true)}
          src="/commentButton.png"
          alt="image"
          style={{ width: "170px", position: "fixed", bottom: 70, right: 70 }}
        />
      </Box>
    </>
  );
};

export default Step1;
