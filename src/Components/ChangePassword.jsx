import { Button } from "@mui/joy";
import { Box, Typography } from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../servises/constPath";

const ChangePassword = () => {
  const [error, setError] = useState('');
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const navigate = useNavigate();
  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log("handleChangePassword");
    if(newPass != conPass) {
        setError('new password and confirm password do not match')
        return;
    }
    const body = {
      id: localStorage.getItem('id'),
      oldPassword: oldPass,
      newPassword: newPass,
    };
    axios
      .post(`${baseUrl}/change-password`,body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Box sx={{}}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#009aca" }}>
          Change Password
        </Typography>
        <Button
          color="neutral"
          sx={{ mr: 2 }}
          onClick={() => navigate("/dashboard")}
        >
          Go To Dashboard
        </Button>
      </Box>
      <form
        action=""
        onSubmit={handleChangePassword}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {error ? <p style={{ color: "red" }}>invalid password</p> : null}

        <input
          required
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          placeholder="Old Password..."
          style={{
            outlineColor: "#0dcaf0",
            maxWidth: "700px",
            border: "none",
            fontSize: 16,
            padding: 5,
            marginTop: 18,
            borderRadius: 5,
            boxShadow: "2px 1px 3px #888888",
            backgroundColor: "#d5f2eb",
            //   borderColor:"#d5f2eb",
            height: 40,
          }}
        />
        <input
          required
          type="password"
          placeholder="New Password..."
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          style={{
            outlineColor: "#0dcaf0",
            maxWidth: "700px",
            border: "none",
            fontSize: 16,
            padding: 5,
            marginTop: 18,
            borderRadius: 5,
            boxShadow: "2px 1px 3px #888888",
            backgroundColor: "#d5f2eb",
            //   borderColor:"#d5f2eb",
            height: 40,
          }}
        />
        <input
          required
          type="password"
          value={conPass}
          placeholder="Confirn Password..."
          onChange={(e) => setConPass(e.target.value)}
          style={{
            outlineColor: "#0dcaf0",
            maxWidth: "700px",
            border: "none",
            fontSize: 16,
            padding: 5,
            marginTop: 18,
            borderRadius: 5,
            boxShadow: "2px 1px 3px #888888",
            backgroundColor: "#d5f2eb",
            //   borderColor:"#d5f2eb",
            height: 40,
          }}
        />
        <br />
        <Button variant="solid" type="submit" sx={{ width: 150 }}>
          Change Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
