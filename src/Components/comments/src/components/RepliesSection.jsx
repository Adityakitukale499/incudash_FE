import { Box, Card, Stack, Typography, Avatar, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import ScoreChanger from "./ScoreChanger";
import {CommentContext} from "../App";
import AddReply from "./AddReply";
import OwnReply from "./OwnReply";
import { stringAvatar } from "./utilities/AvatarColorCodeGenerator";
import replyArrow from "../images/icon-reply.svg";
import { timeDifferenceCalculator } from "./utilities/timeCalculator";

const RepliesSection = ({ commentIndex, isReplyTriggered, setIsReplyTriggered }) => {
  const { currentUser, addReply, commentSection } = useContext(CommentContext);

  return (
    <Stack spacing={2} width="800px" alignSelf="flex-end">
      {commentSection[commentIndex].replies.map((rep, index) => {
        const { content, createdAt, score, user } = rep;
        const { elapsedTimeInWords } = timeDifferenceCalculator(createdAt)

        const replyUserId = user.userId;
        return replyUserId === currentUser.userId ? (
          <OwnReply
            key={rep.id}
            onContent={content}
            createdAt={createdAt}
            onCount={score}
            commentIndex={commentIndex}
            replyIndex={index}
          />
        ) : (
          <Card key={rep.id}>
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
                      <Avatar {...stringAvatar(user.userName)} />
                      <Typography
                        fontWeight="bold"
                        sx={{ color: "neutral.darkBlue" }}
                      >
                        {user.userName}
                      </Typography>
                      <Typography sx={{ color: "neutral.grayishBlue", fontSize:15 }}>
                        {elapsedTimeInWords}
                      </Typography>
                    </Stack>
                    <Button
                      variant="text"
                      sx={{
                        fontWeight: 500,
                        textTransform: "capitalize",
                        color: "custom.moderateBlue",
                      }}
                      startIcon={<img src={replyArrow} alt="reply sign" />}
                      onClick={() => setIsReplyTriggered(!isReplyTriggered)}
                    >
                      Reply
                    </Button>
                  </Stack>
                  <Typography
                    component="div"
                    sx={{ color: "neutral.grayishBlue", p: "15px 0", fontSize:16 }}
                  >
                    <Typography
                      sx={{
                        color: "custom.moderateBlue",
                        width: "fit-content",
                        display: "inline-block",
                        fontWeight: 500, fontSize:16
                      }}
                    >
                      {`@${commentSection[commentIndex].user.userName}`}
                    </Typography>
                    {" " + content}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Card>
        );
      })}
      {isReplyTriggered ? <AddReply onAdd={(text) => addReply(commentIndex, text)} /> : null}
    </Stack>
  );
};

export default RepliesSection;
