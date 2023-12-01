import React, { useContext } from "react";
import { Container, Stack } from "@mui/material";
import Comment from "./Comment";
import AddComment from "./AddComment";
import {CommentContext} from "../App";

export const Core = () => {
  const { commentSection } = useContext(CommentContext);
  // console.log({ commentSection }, "line 9")
  return (
    <Container maxWidth="md" >
      <Stack spacing={3}>
        {commentSection.map((comment, index) => {
          return <Comment key={`${comment?.id} ${index}`} comment={{ ...comment, commentIndex: index }} />;
        })}
        <AddComment />
      </Stack>
    </Container>
  );
};

// export default Core;
