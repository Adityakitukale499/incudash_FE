import { createContext, useEffect, useState } from "react";
import { cloneDeep, isEqual } from "lodash";
import dayjs from "dayjs";
import "./App.css";
import { Core } from "./components/Core";
import { Box } from "@mui/material";

export const CommentContext = createContext({ comments: [], currentUser: {} });

export function CommentProvider({
  comments = [],
  currentUser = {},
  setComments = () => {},
}) {
  const [commentSection, setCommentSection] = useState(comments);
  const [triggerUpdate, setTriggerUpdate] = useState(0);

  const initiateTriggerUpdate = () => {
    setTriggerUpdate(triggerUpdate + 1);
  };

  useEffect(() => {
    setComments(commentSection);
  }, [triggerUpdate])
  

  useEffect(() => {
    !isEqual(comments, commentSection) && setCommentSection(comments);
  }, [comments]);

  const addComment = (data) => {
    setCommentSection([
      ...commentSection,
      {
        id: Math.floor(Math.random() * 10000),
        content: data,
        createdAt: dayjs().unix(),
        score: 0,
        replies: [],
        user: { ...currentUser },
      },
    ]);
    initiateTriggerUpdate();
  };

  const deleteComment = (commentIndex) => {
    let updatedComment = cloneDeep(commentSection);
    updatedComment.splice(commentIndex, 1);
    setCommentSection([...updatedComment]);
    initiateTriggerUpdate();
  };

  const addReply = (index, reply) => {
    let updatedComment = cloneDeep(commentSection);
    let replies = {
      id: Math.floor(Math.random() * 10000),
      content: reply,
      createdAt: dayjs().unix(),
      score: 0,
      user: { ...currentUser },
    };
    updatedComment[index].replies.push(replies);
    setCommentSection([]);
    setCommentSection([...updatedComment]);
    initiateTriggerUpdate();
  };

  const deleteReply = (commentIndex, replyIndex) => {
    let updatedComment = cloneDeep(commentSection);
    updatedComment[commentIndex].replies.splice(replyIndex, 1);
    setCommentSection([...updatedComment]);
    initiateTriggerUpdate();
  };

  const updateCommentText = (commentText, commentIndex) => {
    let updatedComment = cloneDeep(commentSection);
    updatedComment[commentIndex].content = commentText;
    setCommentSection([...updatedComment]);
    initiateTriggerUpdate();
  };

  const updateCommentReplyText = (commentIndex, replyIndex, repText) => {
    let updatedComment = cloneDeep(commentSection);
    updatedComment[commentIndex].replies[replyIndex].content = repText;
    setCommentSection([...updatedComment]);
    initiateTriggerUpdate();
  };

  return (
    <CommentContext.Provider
      value={{
        currentUser,
        commentSection,
        updateCommentText,
        addComment,
        deleteComment,
        addReply,
        deleteReply,
        updateCommentReplyText,
      }}
    >
      <Box height={"25vh"} overflow={"scroll"}>
        <Core />
      </Box>
    </CommentContext.Provider>
  );
}

export default function App({ comments, currentUser, setComments }) {
  return (
    <CommentProvider
      comments={comments}
      currentUser={currentUser}
      setComments={setComments}
    />
  );
}
