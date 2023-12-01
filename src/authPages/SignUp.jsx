import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../servises/constPath";
import { passwordStrength } from "check-password-strength";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ideaContext, signUpContex, userContext } from "../contextApi/context";
import PasswordStrengthBar from "react-password-strength-bar";
import { postData } from "../servises/apicofig";
import Login from "./Login";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState(false);
  const [error, setError] = useState("");
  const { signUpUserId, setSignUpUserId } = useContext(signUpContex);
  const signupSuccessMgs = () =>
    toast.success(
      "Confirmation link successfully sent on your mailId please use that link to log-in"
    );
  const signupFaildMgs = () => toast.warning("Faild to Sign-Up!");
  const {
    idea,
    setIdea,
    loader,
    setLoader,
    successMgs,
    faildMgs,
    stepNum,
    setstepNum,
  } = useContext(ideaContext);

  useEffect(() => {
    if (password) {
      setPassError(
        passwordStrength(password).length < 8 &&
          passwordStrength(password).contains.length < 3
      );
    }
  }, [password]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("signUp function", signUpUserId, setSignUpUserId);
    if (password !== confirmPass) return;
    const body = {
      username: username,
      email: username,
      password: password,
      confirmed: true,
    };
    setLoader(true);
    axios
      .post(`${baseUrl}/auth/local/register`, body)
      .then(function (response) {
        console.log("SignUp", response.data.user.id);
        setLoader(false);
        const ideaBody = {
          userId: response.data.user.id,
          stepNum: 0,
        };
        setLoader(true);
        axios
          .post(`${baseUrl}/ideas`, ideaBody)
          .then((res) => {
            console.log(res);
            setLoader(false);
          })
          .catch((e) => {
            console.log(e);
            setLoader(false);
          });
        signupSuccessMgs();
      })
      .catch(function (error) {
        console.log(error.response.data.message[0].messages[0].message);
        setError(error.response.data.message[0].messages[0].message);
        setLoader(false);
        signupFaildMgs();
      });
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#f1f5fe",
          p: 5,
          flexWrap: "wrap",
          overflow: "scroll",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src="https://incudash.com/assets/public/images/logo.png"
            alt="incuDashImg"
            height={50}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "40%", md: "30", lg: "25%" },
            }}
          >
            <Box
              sx={{
                fontSize: { xs: 15, md: 18, lg: 20 },
                fontWeight: 600,
                color: "#88898e",
              }}
            >
              Already have an account?{" "}
            </Box>
            <Button
              variant="outlined"
              sx={{ height: 45 }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign-In
            </Button>
          </Box>
        </Box>
        <Grid container sx={{ mt: 10 }}>
          <Grid item xs={12} md={6.9} sx={{}}>
            <Typography
              variant="h5"
              color="initial"
              sx={{ fontWeight: 700, color: "#737ba9" }}
            >
              One stop solutions for all
              <br />
              your startup related needs.
            </Typography>
            <img
              src="https://incudash.com/assets/public/images/signin_banner.jpg"
              alt=""
              width={"95%"}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              variant="h5"
              color="initial"
              sx={{ fontWeight: 700, color: "#216be4" }}
            >
              Sign-Up
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ color: "#88898e", fontSize: 19 }}
            >
              See your growth and get funding support.
            </Typography>
            <p style={{ color: "red" }}>{error}</p>
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter full name..."
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  outlineColor: "#0dcaf0",
                  width: "100%",
                  border: "none",
                  fontSize: 16,
                  padding: 10,
                  marginTop: 18,
                  borderRadius: 5,
                  boxShadow: "2px 1px 3px #888888",
                  //   backgroundColor: "#d5f2eb",
                  height: 35,
                }}
              />
              <input
                required
                type="email"
                placeholder="Enter email..."
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                style={{
                  outlineColor: "#0dcaf0",
                  width: "100%",
                  border: "none",
                  fontSize: 16,
                  padding: 10,
                  marginTop: 18,
                  borderRadius: 5,
                  boxShadow: "2px 1px 3px #888888",
                  //   backgroundColor: "#d5f2eb",
                  height: 35,
                }}
              />
              <input
                required
                type="number"
                placeholder="Phone Number..."
                value={phoneNum}
                onChange={(e) => {
                  setError("");
                  setPhoneNum(e.target.value);
                }}
                style={{
                  outlineColor: "#0dcaf0",
                  width: "100%",
                  border: "none",
                  fontSize: 16,
                  padding: 10,
                  marginTop: 18,
                  borderRadius: 5,
                  boxShadow: "2px 1px 3px #888888",
                  //   backgroundColor: "#d5f2eb",
                  height: 35,
                }}
              />
              {/* {passError ? (
                <p
                  style={{
                    color: "red",
                    fontSize: 14,
                    marginBottom: "-18px",
                  }}
                >
                  Your password must be Uppercase, Lowercase, Special Character
                  and Number
                </p>
              ) : null} */}
              <input
                required
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  outlineColor: "#0dcaf0",
                  width: "100%",
                  border: "none",
                  fontSize: 16,
                  padding: 10,
                  marginTop: 18,
                  borderRadius: 5,
                  boxShadow: "2px 1px 3px #888888",
                  //   backgroundColor: "#d5f2eb",
                  height: 35,
                }}
              />
              <PasswordStrengthBar password={password} />
              <input
                required
                type="password"
                // disabled={passError}
                placeholder="Confirm Password..."
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                style={{
                  outlineColor: "#0dcaf0",
                  width: "100%",
                  border: "none",
                  fontSize: 16,
                  padding: 10,
                  marginTop: 18,
                  borderRadius: 5,
                  boxShadow: "2px 1px 3px #888888",
                  //   backgroundColor: "#d5f2eb",
                  height: 35,
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "100%", mt: 2 }}
              >
                Let's Incudash!
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUp;
