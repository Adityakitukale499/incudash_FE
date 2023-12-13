import React, { useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Button, Input } from "@mui/joy";
import { Box } from "@mui/joy";
import * as EmailValidator from "email-validator";
import { toast } from "react-toastify";
import { postData } from "../servises/apicofig";

export default function ForgotPasswordModal({ open, setOpen }) {
  const [email, setEmail] = useState("");

  const mailSent = () =>
    toast.success(
      "Confirmation link successfully sent on your mailId please use that link to reset the password"
    );
  const faildToSentMail = () => toast.error("Invalid Email Id.");
  // console.log(EmailValidator.validate(email));
  const handleForgotPassword = () => {
    if (!EmailValidator.validate(email)) return;

    const body = {
      email,
    };
    postData("auth/forgot-password", body)
      .then((res) => {
        console.log(res.data);
        mailSent();
        // alert('Confirmation link successfully sent on your mailId please use that link to reset the password')
      })
      .catch((e) => {
        console.log(e);
        faildToSentMail()
      });
  };
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
            minWidth: 400,
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
            Forgot Password
          </Typography>
          <Box id="modal-desc" sx={{ display: "flex", gap: 2 }}>
            {/* <Typography>Enter your register email id</Typography> */}

            <Input
              type="email"
              placeholder="Enter Your Register Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "85%" }}
            />

            <Button onClick={handleForgotPassword}>Submit</Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
