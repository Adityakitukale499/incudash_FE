import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import {CommentContext} from "../App";
import theme from "../styles";
import AddReplyButton from "./Reusable/Buttons/BgButtons/AddReplyButton";
import EditableReplyField from "./Reusable/Reply/EditableReplyField";
import { stringAvatar } from "./utilities/AvatarColorCodeGenerator";

const AddReply = ({ onAdd }) => {
  const { currentUser } = useContext(CommentContext);
  const [replyText, setReplyText] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Box sx={{ p: "15px" }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              {...stringAvatar(currentUser.userName)}
            />
            <EditableReplyField
              placeHolder="Add a reply"
              setText={setReplyText}
              text={replyText}
            />
            <AddReplyButton
              onAdd={onAdd}
              replyText={replyText}
              setReplyText={setReplyText}
            />
          </Stack>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default AddReply;
