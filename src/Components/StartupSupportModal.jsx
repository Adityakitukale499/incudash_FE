import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box } from "@mui/material";

export default function StartupSupportModal({
  open,
  setOpen,
  heading,
  messages,
}) {
  return (
    <>
      <Modal
        aria-labelledby="modal-roadmapTitle"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 600,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h1"
            id="modal-roadmapTitle"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            minWidth={400}
          >
            {heading}
          </Typography>
          <Box id="modal-desc" height={"60vh"} sx={{ overflowY: "scroll" }}>
            {messages.map((e)=>(
                <>
                <Typography
                component="h3"
                id="modal-roadmapTitle"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                my={1}
                minWidth={400}
              >
                {e.heading}
              </Typography>
              <Box>
                {e.content}
              </Box>
              </>
            ))}
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
