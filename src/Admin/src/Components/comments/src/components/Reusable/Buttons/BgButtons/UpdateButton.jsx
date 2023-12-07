import { Button } from "@mui/material";
import React from "react";
import { isEmpty } from "lodash";

const UpdateButton = ({ commentText, editingComm, setEditingComm, updateCommentText }) => {
  return (
    <Button
      sx={{
        float: "right",
        bgcolor: "custom.moderateBlue",
        color: "neutral.white",
        p: "8px 25px",
        "&:hover": {
          bgcolor: "custom.lightGrayishBlue",
        },
      }}
      onClick={() => {
        if (isEmpty(commentText.trim())) {
          alert(
            "If  you want to remove the comment text, just delete the comment."
          )
        }
        else {
          updateCommentText(commentText)
          setEditingComm(!editingComm)
        }

      }}
    >
      Update
    </Button>
  );
};

export default UpdateButton;
