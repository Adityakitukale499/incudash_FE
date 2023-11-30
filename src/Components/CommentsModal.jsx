import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/joy";
import App from "./comments/src/App";

export default function CommentsModal({
  open,
  setOpen,
  comments,
  currentUser,
  setComments,
}) {
  return (
    <>
      <Modal
        aria-labelledby="modal-roadmapTitle"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: '80%',
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-roadmapTitle"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            sx={{
              pr: 5,
              mb: 4,
              mt: -0.8,
            }}
          >
            Comments
          </Typography>
          <Box id="modal-desc" sx={{}}>
            <App
              comments={comments}
              currentUser={currentUser}
              setComments={setComments}
            />
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
