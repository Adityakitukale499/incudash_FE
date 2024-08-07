import { Typography } from "@mui/material";
import React from "react";

const CreatedAt = ({ createdAt }) => {
  return (
    <Typography sx={{ color: "neutral.grayishBlue", fontSize:15 }}>{createdAt}</Typography>
  );
};

export default CreatedAt;
