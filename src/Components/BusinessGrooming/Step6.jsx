import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ideaContext } from "../../contextApi/context";

const Step6 = () => {
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
  const navigate = useNavigate();

  const saveStep = () => {
    const body = {
      stepNum: stepNum == 5 ? 6 : idea.stepNum,
    };
    setLoader(true);
    putData("652f8bff127bd15a1883f5fd", body)
      .then((d) => {
        // console.log("step4putreqest", data.data);
        setIdea(d.data);
        setLoader(false);
        successMgs();
      })
      .catch((e) => {
        console.log(e);
        faildMgs();
        setLoader(false);
      });
    
      if(stepNum == 5) setstepNum(6)
      navigate("/dashboard/step7")
  };

  return (
    <Box sx={{ p: 0, mr: 0 }}>
      <Typography variant="body1" color="initial"  sx={{fontWeight:550}}>
        Step 6 -<span style={{ color: "#009aca" }}> Raise Funding</span>
      </Typography>
      <Typography variant="body1" color="initial">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ipsum alias
        fugit est, iste officia
      </Typography>

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          m: "auto",
          mt: 5,
          p: 4,
          height: 450,
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <Button
          variant="contained"
          onClick={() => saveStep()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Step6;
