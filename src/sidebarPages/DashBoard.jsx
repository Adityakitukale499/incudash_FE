import React, { useContext, useState } from "react";
import { VideoCard, TestimonalCard } from "../Components/Cards";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { CardActionArea, CardActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { ideaContext } from "../contextApi/context";
import Tooltip from '@mui/material/Tooltip';
import { stepRoute } from "../servises/constPath";

const DashBoard = () => {
  const [founderGromingData, setFounderGromingData] = useState([
    {
      img: "https://incudash.com/assets/public/dashboard/images/jicon-1.jpg",
      title: "Start'Up Stage",
      content:
        "It is important to understand what phase your Startup is currently in & which is the next phase to grow into.",
      route: "/dashboard/step1",
    },
    {
      img: "https://incudash.com/assets/public/dashboard/images/jicon-2.jpg",
      title: "Validate Idea",
      content:
        "Validation reduces the risk, speeds up the delivery of a value-creating service in the market, and minimizes the costs.",
      route: "/dashboard/step2",
    },
    {
      img: "https://incudash.com/assets/public/dashboard/images/jicon-3.jpg",
      title: "Product Roadmap",
      content:
        "A product roadmap is an illustration of how you get from your company’s big-picture, high-level goals to the actual actions you need to take to achieve those goals.",
      route: "/dashboard/step3",
    },
    {
      img: "https://incudash.com/assets/public/dashboard/images/jicon-4.jpg",
      title: "Financial Valuation Validation",
      content:
        "Validation gives a simple sanity check to the modeling team by addressing oversights, providing additional insights, and verifying the performance.",
      route: "/dashboard/step4",
    },
    {
      img: "https://incudash.com/assets/public/dashboard/images/jicon-4.jpg",
      title: "Pitch Deck Validation",
      content:
        "Expert Validation to make sure your Pitch Deck is ready to be showcased to an Investor.",
      route: "/dashboard/step5",
    },
    {
      img: "https://incudash.com/assets/public/dashboard/images/jicon-6.jpg",
      title: "Raise Funding",
      content:
        "Let us connect your pitch to the investors best suited for you.",
      route: "/dashboard/step6",
    },
    // {
    //   img: "https://incudash.com/assets/public/dashboard/images/jicon-6.jpg",
    //   title: "Track Progress",
    //   content:
    //     "Get access to tools to track your progress and growth in your startup journey.",
    //   route: "/dashboard/step7",
    // },
  ]);
  const [open, setOpen] = useState(false);
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

  const handleClick = () => {
    console.log("in handleclick");
    setOpen(!open);
  };

  const navigate = useNavigate();

  const steps = [
    "StartUp",
    "Idea",
    "Roadmap",
    "Valuation",
    "Pitch Deck",
    "Funding",
  ];

  return (
    <>
      <Accordion defaultExpanded={true} sx={{borderRadius:1}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5" sx={{fontWeight:550}}> Founder's Gromming</Typography>
        </AccordionSummary>
        <Box sx={{ width: "100%", mb: 3 }}>
          <Stepper activeStep={stepNum} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <AccordionDetails>
          <Grid container spacing={3}>
            {founderGromingData.map((e, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Tooltip title={i > stepNum?'Complet the preve step for start this step!':''}>
                <Card
                  sx={{ border: 1, borderColor: i<=stepNum-1?'#fe6508':i > stepNum?'#9d9b9b':'#009aca'}}
                  onClick={() => i <= stepNum ?navigate(e.route):null}
                >
                  <CardActionArea sx={{ textAlign: "start" }}>
                    <img
                      src={e.img}
                      alt="img"
                      style={{ height: 60, margin: 5 }}
                    />
                    <CardContent sx={{ height: 130, overflowX: "scroll" }}>
                      <Typography variant="body2" component="div"  sx={{fontWeight:550}}>
                        {e.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{}}
                      >
                        {e.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{
                      backgroundColor: i<=stepNum-1?'#fe6508':i > stepNum?'#9d9b9b':'#009aca',
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      height: 30,
                    }}
                    
                  >
                    {i<=stepNum-1?'Review':i > stepNum?'Pending':'Start'}
                  </CardActions>
                </Card>
                </Tooltip>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={3} >
                <Card
                  sx={{ border: 1, borderColor: '#009aca'}}
                  onClick={() => navigate(stepRoute.step7)}
                >
                  <CardActionArea sx={{ textAlign: "start" }}>
                    <img
                      src='https://incudash.com/assets/public/dashboard/images/jicon-7.jpg'
                      alt="img"
                      style={{ height: 60, margin: 5 }}
                    />
                    <CardContent sx={{ height: 130, overflowX: "scroll" }}>
                      <Typography variant="body2" component="div"  sx={{fontWeight:550}}>
                      Track Progress
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{}}
                      >
                       Get access to tools to track your progress and growth in your startup journey.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{
                      backgroundColor: '#009aca',
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      height: 30,
                    }}
                    
                  >
                    Track Progress
                  </CardActions>
                </Card>
              </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={4} sx={{ pt: 2 }}>
        <Grid item={true} xs={12} md={6}>
          <Card onClick={() => navigate("/stratupsupport")}>
            <CardActionArea sx={{ display: "flex", justifyContent: "left" }}>
              <img
                src="https://incudash.com/assets/public/dashboard/images/dash.jpg"
                alt="img"
                style={{ height: 90, margin: 5 }}
              />
              <CardContent>
                <Typography variant="body1" component="div"  sx={{fontWeight:550}}>
                  What Is Startup Support?
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  The Startup Support dashboard is the go-to place for a founder
                  for all his business-related needs.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card onClick={() => navigate("/requestacallback")}>
            <CardActionArea sx={{ display: "flex", justifyContent: "left" }}>
              <img
                src="https://incudash.com/assets/public/dashboard/images/talk.jpg"
                alt="img"
                style={{ height: 90, margin: 5 }}
              />

              <CardContent>
                <Typography variant="body1" component="div"  sx={{fontWeight:550}}>
                  Talk To Our Experts
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Book a session with our investment team to get started.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "end", mt: 5, height: "0px" }}
      >
        <Link
          onClick={handleClick}
          style={{ paddingTop: 5, marginRight: "15px" }}
        >
          {open ? "Hide" : "See All"}
        </Link>
      </Box>
      <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
        <Typography
          variant="body1"
          color="initial"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: -1.5,
            mb: 2,
            py:1
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 600 }}>
            Startuptok - Get Startup Ready
          </span>{" "}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <VideoCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <VideoCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <VideoCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <VideoCard />
          </Grid>
        </Grid>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <VideoCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <VideoCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <VideoCard />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <VideoCard />
            </Grid>
          </Grid>
        </Collapse>
      </Box>
      
      <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2, mt: 3 }}>
        <Typography
          variant="body1"
          color="initial"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span style={{ fontSize: 20, fontWeight: 600 }}>Testimonal</span>
          <Link> See All</Link>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TestimonalCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TestimonalCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TestimonalCard />
          </Grid>
        </Grid>
        <CardActions sx={{ borderTop: "2px solid lightGrey", mt: 4, fontWeight:600 }}>
          Our Ecosystem partners
        </CardActions>
      </Box>
    </>
  );
};

export default DashBoard;
