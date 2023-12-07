import { Button } from "@mui/material";
import React from "react";

const UpdateReplyButton = ({
  repText,
  onUpdateBtnClick
}) => {
  return (
    <Button
      sx={{
        bgcolor: "custom.moderateBlue",
        color: "neutral.white",
        p: "8px 25px",
        float: "right",
        "&:hover": {
          bgcolor: "custom.lightGrayishBlue",
        },
      }}
      onClick={() => {
        !repText.trim()
          ? alert("Read the placeholder.")
          : onUpdateBtnClick();
      }}
    >
      Update
    </Button>
  );
};

export default UpdateReplyButton;
