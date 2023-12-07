import React, { useContext, useState } from "react";
import { Avatar, Card, Stack, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import {CommentContext} from "../App";
import ScoreChanger from "./ScoreChanger";
import theme from "../styles";
import RepliesSection from "./RepliesSection";
import ConfirmDelete from "./ConfirmDelete";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";
import CommentText from "./Reusable/Comment/CommentText";
import EditableCommentField from "./Reusable/Comment/EditableCommentField";
import EditButton from "./Reusable/Buttons/TextButtons/EditButton";
import DeleteButton from "./Reusable/Buttons/TextButtons/DeleteButton";
import ReplyButton from "./Reusable/Buttons/TextButtons/ReplyButton";
import UpdateButton from "./Reusable/Buttons/BgButtons/UpdateButton";
import { stringAvatar } from "./utilities/AvatarColorCodeGenerator";
import { timeDifferenceCalculator } from "./utilities/timeCalculator";

const Comment = ({ comment }) => {
  // console.log(comment);
  const { content, createdAt, user, commentIndex } = comment;
  const { currentUser, updateCommentText } = useContext(CommentContext);
  const { isEditingAllowed, elapsedTimeInWords } = timeDifferenceCalculator(createdAt)
  const { userName, userId } = user;

  const [isReplyTriggered, setIsReplyTriggered] = useState(false);
  const [editingComm, setEditingComm] = useState(false);
  const [commentText, setCommentText] = useState(content);
  const [openModal, setOpenModal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <ConfirmDelete onOpen={openModal} onClose={() => setOpenModal(false)} commentIndex={commentIndex} isReplyDelete={false} />
      <Card>
        <Box sx={{ p: "15px" }}>
          <Stack spacing={2} direction="row">
            <Box>
              {/* <ScoreChanger onScore={score} /> */}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={2} direction="row" alignItems="center">
                  <Avatar  {...stringAvatar(userName)} />
                  <Username userName={userName} />
                  <CreatedAt createdAt={elapsedTimeInWords} />
                </Stack>
                {userId === currentUser.userId && isEditingAllowed ? (
                  <Stack direction="row" spacing={1}>
                    <DeleteButton functionality={() => setOpenModal(true)} />
                    <EditButton
                      functionality={() => setEditingComm(!editingComm)}
                      editingComm={editingComm}
                    />
                  </Stack>
                ) : (
                  <></>
                )}

                {userId !== currentUser.userId && <ReplyButton functionality={() => setIsReplyTriggered(!isReplyTriggered)} />}
              </Stack>
              {editingComm ? (
                <>
                  <EditableCommentField
                    commentText={commentText}
                    setCommentText={setCommentText}
                    placeHolder="Don't leave this blank!"
                  />
                  <UpdateButton
                    commentText={commentText}
                    editingComm={editingComm}
                    setEditingComm={setEditingComm}
                    onClick={(commentText) => updateCommentText(commentText, commentIndex)}
                  />
                </>
              ) : (
                <CommentText commentText={commentText} />
              )}
            </Box>
          </Stack>
        </Box>
      </Card>
      <RepliesSection
        commentIndex={commentIndex}
        setIsReplyTriggered={setIsReplyTriggered}
        isReplyTriggered={isReplyTriggered}
      />
    </ThemeProvider>
  );
};
export default Comment;
