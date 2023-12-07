import React, { useContext, useState } from "react";
import { Box, Card, Stack, Avatar } from "@mui/material";
import {CommentContext} from "../App";
import ScoreChanger from "./ScoreChanger";
import ConfirmDelete from "./ConfirmDelete";
import Username from "./Reusable/Username";
import CreatedAt from "./Reusable/CreatedAt";
import DeleteButton from "./Reusable/Buttons/TextButtons/DeleteButton";
import EditButton from "./Reusable/Buttons/TextButtons/EditButton";
import ReplyText from "./Reusable/Reply/ReplyText";
import UpdateReplyButton from "./Reusable/Buttons/BgButtons/UpdateReplyButton";
import EditableReplyField from "./Reusable/Reply/EditableReplyField";
import { stringAvatar } from "./utilities/AvatarColorCodeGenerator";
import { timeDifferenceCalculator } from "./utilities/timeCalculator";

const OwnReply = ({ onContent,
  onCount,
  commentIndex,
  replyIndex,
  createdAt
}) => {
  const { currentUser, updateCommentReplyText, commentSection } = useContext(CommentContext);
  const { isEditingAllowed, elapsedTimeInWords } = timeDifferenceCalculator(createdAt)

  const [isEditReplyOpen, setIsEditReplyOpen] = useState(false);
  const [repText, setRepText] = useState(onContent);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEdit = () => {
    setIsEditReplyOpen(true);
  };

  const onUpdateBtnClick = () => {
    setIsEditReplyOpen(false);
    updateCommentReplyText(commentIndex, replyIndex, repText)
  }
  return (
    <>
      <ConfirmDelete
        onOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        commentIndex={commentIndex}
        replyIndex={replyIndex}
        isReplyDelete={true}
      />
      <Card>
        <Box sx={{ p: "15px" }}>
          <Stack spacing={2} direction="row">
            <Box>
              {/* <ScoreChanger onScore={onCount} /> */}
            </Box>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={2} direction="row" alignItems="center">
                  <Avatar   {...stringAvatar(currentUser.userName)} />
                  <Username userName={currentUser.userName} />
                  <CreatedAt createdAt={elapsedTimeInWords} />
                </Stack>
                {isEditingAllowed && <Stack direction="row" spacing={1}>
                  <DeleteButton functionality={() => setDeleteModal(true)} />
                  <EditButton
                    editingComm={isEditReplyOpen}
                    functionality={handleEdit}
                  />
                </Stack>}
              </Stack>
              {isEditReplyOpen ? (
                <>
                  <EditableReplyField
                    repText={repText}
                    setText={setRepText}
                    placeHolder="Don't leave this blank!"
                  />
                  <UpdateReplyButton
                    repText={repText}
                    onUpdateBtnClick={onUpdateBtnClick}
                  />
                </>
              ) : (
                <ReplyText repText={repText} replyingTo={commentSection[commentIndex].user.userName} />
              )}
            </Box>
          </Stack>
        </Box>
      </Card>
    </>
  );
};

export default OwnReply;
