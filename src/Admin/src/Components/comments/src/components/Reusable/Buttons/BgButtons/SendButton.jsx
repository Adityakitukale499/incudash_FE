import { Button } from "@mui/material";
import React, { useContext } from "react";
import {CommentContext} from "../../../../App";

const SendButton = ({ setCommentTxt, commentTxt }) => {
  const { addComment } = useContext(CommentContext);

  return (
    <Button
      size="large"
      sx={{
        bgcolor: "custom.moderateBlue",
        color: "neutral.white",
        p: "4px 25px",
        "&:hover": {
          bgcolor: "custom.lightGrayishBlue",
        },
      }}
      onClick={(e) => {
        !commentTxt.trim() ? e.preventDefault() : addComment(commentTxt.trim());
        setCommentTxt("");
      }}
    >
      Send
    </Button>
  );
};

export default SendButton;
