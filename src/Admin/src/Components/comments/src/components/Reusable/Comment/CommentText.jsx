import { Typography } from "@mui/material";
import React from "react";

const CommentText = ({ commentText }) => {
  return (
    <Typography sx={{ color: "neutral.grayishBlue", p: "15px 0" , fontSize:16}}>
      {commentText}
    </Typography>
  );
};

export default CommentText;
