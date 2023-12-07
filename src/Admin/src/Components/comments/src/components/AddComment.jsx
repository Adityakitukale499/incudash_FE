import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import {CommentContext} from "../App";
import theme from "../styles";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import SendButton from "./Reusable/Buttons/BgButtons/SendButton";
import { stringAvatar } from "./utilities/AvatarColorCodeGenerator";

const AddComment = () => {
  const { currentUser } = useContext(CommentContext);
  const [commentTxt, setCommentTxt] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Box sx={{ p: "15px" }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              {...stringAvatar(currentUser.userName)}
            />
            <EditableCommentField
              commentText={commentTxt}
              setCommentText={setCommentTxt}
              placeHolder="Add a comment"
            />
            <SendButton commentTxt={commentTxt} setCommentTxt={setCommentTxt} />
          </Stack>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default AddComment;
