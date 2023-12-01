import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../servises/constPath";
import "react-toastify/dist/ReactToastify.css";
import { ideaContext, signUpContex, userContext } from "../contextApi/context";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { getData } from "../servises/apicofig";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function Login() {
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
  const { user, setUser } = useContext(userContext);
  const { signUpUserId, setSignUpUserId } = useContext(signUpContex);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [forgotPassModal, setForgotPassModal] = useState(false);
  const [jwt, setJwt] = useState("");
  const loginSuccessMgs = () => toast.success("Log-In Successfully!");
  const loginFaildMgs = () => toast.warning("Faild to Log-In!");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit", e);
    const body = {
      identifier: username,
      password: password,
    };
    setLoader(true);
    axios
      .post(`${baseUrl}/auth/local`, body)
      .then(function (response) {
        console.log(response.data);
        setJwt(response.data.jwt);
        localStorage.setItem("jwt", response.data.jwt);
        // localStorage.setItem("id", response.data.user.id);
        loginSuccessMgs();
        setError(false);
        navigate("/dashboard");
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
        loginFaildMgs();
        setError(true);
        setLoader(false);
      });
    // console.log(signUpUserId);
    // if (signUpUserId) {
    //   const ideaBody = {
    //     userId: signUpUserId,
    //     stepNum: 0,
    //   };
    //   setLoader(true);
    //   axios
    //     .post(`${baseUrl}/ideas`, ideaBody)
    //     .then((res) => {
    //       console.log(res);
    //       setLoader(false);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       setLoader(false);
    //     });
    // }
  };

  useEffect(() => {
    if (jwt) {
      let userId = jwtDecode(jwt).id;
      if (!userId) return;

      setLoader(true);
      getData(`users/${userId}`)
        .then(function (response) {
          console.log(response.data);
          setUser(response.data);
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);
        });

      setLoader(true);

      getData(`ideas/findByUserId/${userId}`)
        .then(function (response) {
          // console.log(response.data);
          setIdea(response.data);
          setstepNum(response.data.stepNum);
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);
        });
    }
  }, [jwt]);

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
              Don't have an account?{" "}
            </Box>
            <Button
              variant="outlined"
              sx={{ height: 45 }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign-Up
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
              Sign-In
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{ color: "#88898e", fontSize: 19 }}
            >
              See your growth and get funding support.
            </Typography>
            <form action="" onSubmit={handleSubmit}>
              {error ? (
                <p style={{ color: "red" }}>invalid username or password</p>
              ) : null}
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username..."
                style={{
                  outlineColor: "#0dcaf0",
                  width: "100%",
                  border: "none",
                  fontSize: 16,
                  padding: 5,
                  marginTop: 18,
                  borderRadius: 5,
                  boxShadow: "2px 1px 3px #888888",
                  backgroundColor: "#d5f2eb",
                  height: 35,
                }}
              />
              <input
                required
                type="text"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  outlineColor: "#0dcaf0",
                  width: "100%",
                  border: "none",
                  fontSize: 16,
                  padding: 5,
                  marginTop: 18,
                  borderRadius: 5,
                  boxShadow: "2px 1px 3px #888888",
                  backgroundColor: "#d5f2eb",
                  //   borderColor:"#d5f2eb",
                  height: 35,
                }}
              />
              {/* <input type="password" /> */}
              <Box sx={{ textAlign: "end", color: "#88898e", pt: 2, pb: 3 }}>
                <span style={{cursor:'pointer'}} onClick={() => setForgotPassModal(true)}>
                  Forgot Password?
                </span>
              </Box>
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Let's Incudash!
              </Button>
            </form>
          </Grid>
        </Grid>
        <ForgotPasswordModal
          open={forgotPassModal}
          setOpen={setForgotPassModal}
        />
      </Box>
    </>
  );
}
