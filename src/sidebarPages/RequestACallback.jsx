import React, { useEffect, useState } from "react";
import { Box,  Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const RequestACallback = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 0, mr: 0 }}>
      <Typography
        variant="h6"
        color="initial"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <span style={{ color: "#009aca" }}> Request A CallBack</span>{" "}
        <Button
          color="nuetral"
          onClick={() => navigate("/dashboard")}
          // sx={{ mr: 2, bgcolor: "grey" }}
        >
          Go To Dashboard
        </Button>
      </Typography>

      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 2,
          m: "auto",
          my: 5,
          p: 4,
          height: "100%",
        }}
      >
        <Typography
          variant="h6"
          color="initial"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Please fill this form below
        </Typography>
        <Box sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox name="InvestmentRelated" />}
            label="Investment Related"
          />
          <FormControlLabel
            control={<Checkbox name="StartupRelated" />}
            label="Startup Related"
          />
          <FormControlLabel
            control={<Checkbox name="PitchDeckRelated" />}
            label="Pitch Deck Related"
          />
          <FormControlLabel
            control={<Checkbox name="MentorRelated" />}
            label="Mentor Related"
          />
          <FormControlLabel control={<Checkbox name="other" />} label="Other" />
        </Box>
        <textarea
          placeholder="Leave a comment here"
          name="postContent"
          style={{ maxWidth: "100%", width: "100%", height: 200, padding: 10 }}
        />
        <Box
          sx={{ width: "88vw", display: "flex", justifyContent: "end", mt: 5 }}
        >
          <Button variant="contained">Request a call</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RequestACallback;
