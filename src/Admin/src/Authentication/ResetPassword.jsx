import { Button } from "@mui/material";
import { Box, Typography } from "@mui/material";

import React, { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loaderContext } from "../ContextApi/context";
import { postData } from "../Services/api";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [succses, setSuccses] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");
  const navigate = useNavigate();
  const { loader, setLoader } = useContext(loaderContext);
  const code = useLocation()
  console.log(code.search.split('code=')[1]);
  const handleChangePassword = (e) => {
    e.preventDefault();
    if(!code.search.split('code=')[1]){
      alert('Invalide way, to reset password')
      return;
    }
    if (newPass != conPass) {
      setError("new password and confirm password do not match");
      return;
    }
    const body = {
      code:code.search.split('code=')[1],
      password: newPass,
      passwordConfirmation: conPass
    };

    setLoader(true);
    postData("auth/reset-password", body)
      .then(function (response) {
        setLoader(false);
        console.log(response);
        alert('Reset password succesfully!')
      })
      .catch(function (error) {
        setLoader(false);
        alert('faild to reset passsword!!')
        console.log(error);
      });
  };
  return (
    <Box sx={{}}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#009aca" }}>
          Reset Password
        </Typography>
      </Box>
      <form
        action=""
        onSubmit={handleChangePassword}
        style={{ display: "flex", flexDirection: "column", width:'100%' }}
      >
        <p style={{ color: "red" }}>{error}</p>
        <p style={{ color: "green" }}>{succses}</p>
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
            // backgroundColor: "#d5f2eb",
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
            // backgroundColor: "#d5f2eb",
            //   borderColor:"#d5f2eb",
            height: 40,
          }}
        />
        <br />
        <Button variant="contained" type="submit" sx={{ width: 170 }}>
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
