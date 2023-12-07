import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Button } from "@mui/material";
import { Box } from "@mui/joy";

export default function Confirmation({ open, setOpen, setConform, massage }) {
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
            maxWidth: 400,
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
              pr:5 ,
              mb:4,
              mt:-0.8
            }}
          >
            {massage}
          </Typography>
          <Box id="modal-desc" sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => {
                setOpen(false);
                // setConform();
              }}
            >
              No
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                setConform();
              }}
            >
              Yes
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
