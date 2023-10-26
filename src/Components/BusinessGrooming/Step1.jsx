import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import SelectIndustry from "../SelectIndustry";
import { useNavigate } from "react-router-dom";
import { ideaContext } from "../../contextApi/context";
import NavigateBtn from "../NavigateBtn";
import { putData } from "../../servises/apicofig";

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
  const [comment, setComment] = useState("");
  const [stage, setStage] = useState("");
  const [industry, setIndustry] = useState("");
  useEffect(() => {
    if (idea) {
      setStage(idea.startupStage.stage);
      setIndustry(idea.startupStage.industry.split(','));
    }
  }, [idea]);

  const saveStep1 = () => {
    const body = {
      startupStage: {
        stage: stage,
        industry: industry.join(','),
      },
      stepNum: stepNum == 0 ? 1 : idea.stepNum,
    };
    setLoader(true);
    putData("652f8bff127bd15a1883f5fd", body)
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
    if (stage !== idea.startupStage.stage && industry !== idea.startupStage.industry) {
      // console.log('step1 save and next');
      saveStep1();
    }
    navigate("/dashboard/step2");
  };

  // useEffect(() => {
  //   console.log(idea);
  // }, [idea]);

  return (
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
              <Typography variant="h6" color="initial" sx={{ fontWeight: 550 }}>
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
        <Grid item xs={12} md={5.7} sx={{ bgcolor: "#fff", borderRadius: 2, m: 1 }}>
          <Box sx={{ mt: -2, pr: 5 }}>
            <Typography variant="h6" color="initial" sx={{ fontWeight: 550 }}>
              Select the stage of your StartUp
            </Typography>
            <Grid container spacing={3} sx={{ mt: 0.1 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    Width: 90,
                    borderColor: "#fe6508",
                    textAlign: "center",
                    border:
                      stage == "idea" ? "1px solid #009aca" : "0px solid grey",
                  }}
                  onClick={() => setStage("idea")}
                >
                  <CardActionArea>
                    <img
                      src="https://incudash.com/assets/public/dashboard/images/1.jpg"
                      alt="img"
                      style={{ height: 50 }}
                    />
                    <Box sx={{ color: stage == "idea" ? "#009aca" : "grey" }}>
                      Idea Stage
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    Width: 90,
                    borderColor: "#fe6508",
                    textAlign: "center",
                    border:
                      stage == "seed" ? "1px solid #009aca" : "0px solid grey",
                  }}
                  onClick={() => setStage("seed")}
                >
                  <CardActionArea>
                    <img
                      src="https://incudash.com/assets/public/dashboard/images/22.png"
                      alt="img"
                      style={{ height: 50 }}
                    />
                    <Box sx={{ color: stage == "seed" ? "#009aca" : "grey" }}>
                      Seed Stage
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    Width: 90,
                    borderColor: "#fe6508",
                    textAlign: "center",
                    border:
                      stage == "series"
                        ? "1px solid #009aca"
                        : "0px solid grey",
                  }}
                  onClick={() => setStage("series")}
                >
                  <CardActionArea>
                    <img
                      src="https://incudash.com/assets/public/dashboard/images/33.png"
                      alt="img"
                      style={{ height: 50 }}
                    />
                    <Box sx={{ color: stage == "series" ? "#009aca" : "grey" }}>
                      Series Stage
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
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
              disable={stage === idea?.startupStage.stage || industry === idea?.startupStage.industry}
              saveFun={saveStep1}
              saveAndNextFun={saveAndNext}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Step1;
