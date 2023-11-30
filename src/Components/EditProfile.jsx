import { Button } from "@mui/joy";
import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../servises/constPath";
import { userContext } from "../contextApi/context";
import axios from "axios";
import { putData } from "../servises/apicofig";

const EditProfile = () => {
  const [update, setUpdate] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  // console.log(user);
  useEffect(() => {
    if (user) {
      setFirstName(user?.name?.firstName);
      setLastName(user?.name?.lastName);
      setEmail(user?.email);
      setUsername(user?.username);
      setPhoneNumber(user?.phoneNumber);
    }
  }, [user]);

  useEffect(() => {
    if (
      firstName != user?.name?.firstName ||
      lastName != user?.name?.lastName ||
      email != user?.email ||
      username != user?.username ||
      phoneNumber != user?.phoneNumber
    ) {
      setUpdate(true);
    } else {
      setUpdate(false);
    }
    console.log(update);
  }, [firstName, lastName, phoneNumber, email, username]);

  const handleReset = () => {
    setFirstName(user?.name?.firstName);
    setLastName(user?.name?.lastName);
    setEmail(user?.email);
    setUsername(user?.username);
    setPhoneNumber(user?.phoneNumber);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    console.log("handleChangePassword");
    const body = {
      //   confirmed: true,
      //   blocked: false,
      //   provider: "local",
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      name: {
        firstName: firstName,
        lastName: lastName,
      },
    };
    // axios
    //   .put(`${baseUrl}/user/update/${user.id}`, body, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   })
    putData(`user/update/${user.id}`,body)
      .then(function (response) {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Box sx={{}}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#009aca" }}>
          Edit Profile
        </Typography>
        <Button
          color="neutral"
          sx={{ mr: 2 }}
          onClick={() => navigate("/dashboard")}
        >
          Go To Dashboard
        </Button>
      </Box>
      <hr />
      <form
        action=""
        onSubmit={handleEditProfile}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "48%", minWidth: "250px", marginTop: 18 }}>
            <label htmlFor="fname">FirstName</label>
            <input
              id="fname"
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Firstname..."
              style={{
                outlineColor: "#0dcaf0",
                width: "100%",
                border: "none",
                fontSize: 16,
                padding: 5,

                borderRadius: 5,
                boxShadow: "0px 1px 5px #888888",
                // backgroundColor: "#d5f2eb",
                //   borderColor:"#d5f2eb",
                height: 40,
              }}
            />
          </div>
          <div style={{ width: "48%", minWidth: "250px", marginTop: 18 }}>
            <label htmlFor="lname">LastName</label>
            <input
              id="lname"
              required
              type="text"
              placeholder="LastName..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                outlineColor: "#0dcaf0",
                width: "100%",
                //   minWidth: "250px",
                border: "none",
                fontSize: 16,
                padding: 5,
                // marginTop: 18,
                borderRadius: 5,
                boxShadow: "0px 1px 5px #888888",
                // backgroundColor: "#d5f2eb",
                //   borderColor:"#d5f2eb",
                height: 40,
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "48%", minWidth: "250px", marginTop: 18 }}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="UserName..."
              style={{
                outlineColor: "#0dcaf0",
                width: "100%",
                //   minWidth: "250px",
                border: "none",
                fontSize: 16,
                padding: 5,
                // marginTop: 18,
                borderRadius: 5,
                boxShadow: "0px 1px 5px #888888",
                // backgroundColor: "#d5f2eb",
                //   borderColor:"#d5f2eb",
                height: 40,
              }}
            />
          </div>
          <div style={{ width: "48%", minWidth: "250px", marginTop: 18 }}>
            <label htmlFor="pNumber">Phone Number</label>
            <input
              id="pNumber"
              required
              type="text"
              placeholder="Phone Number..."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{
                outlineColor: "#0dcaf0",
                width: "100%",
                //   minWidth: "250px",
                border: "none",
                fontSize: 16,
                padding: 5,
                // marginTop: 18,
                borderRadius: 5,
                boxShadow: "0px 1px 5px #888888",
                // backgroundColor: "#d5f2eb",
                //   borderColor:"#d5f2eb",
                height: 40,
              }}
            />
          </div>
        </div>
        <label htmlFor="email" style={{ marginTop: 18 }}>
          Email
        </label>
        <input
          id="email"
          required
          type="email"
          value={email}
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          style={{
            outlineColor: "#0dcaf0",
            width: "100%",
            border: "none",
            fontSize: 16,
            padding: 5,
            // marginTop: 18,
            borderRadius: 5,
            boxShadow: "0px 1px 5px #888888",
            // backgroundColor: "#d5f2eb",
            //   borderColor:"#d5f2eb",
            height: 40,
          }}
        />
        <br />
        <div>
          <Button
            variant="solid"
            disabled={!update}
            type="submit"
            sx={{ mr: 1 }}
          >
            Update
          </Button>
          <Button variant="solid" onClick={handleReset} sx={{ ml: 1 }}>
            Reset
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EditProfile;

// {
//     "confirmed": true,
//     "blocked": false,
//     "username": "aditya",
//     "email": "shubham@gmail.com",
//     "provider": "local",
//     "phoneNumber": "7066994198",
//     "name": {
//         "firstName": "aaditya",
//         "lastName": "kitukale"
//     }
// }

// founderGrooming:{
//     founderInfo:{
//       name:"",
//       designation:"",
//       companyName:"",
//       imageRef:""
//     },
//     maxBookingInADay:"",
//     price:"",
//     isDisabled:"",
//     isDeactivated:"boolean"
//   },

// founderBooking:{
//     id:"",
//     fouderId:"",
//     dateOfBooking:"",
//     isBookingCancelled:"",
//     isBookingRescheduled:"",
//     userId:""
//   },

// mentorGrooming:{
//     mentorInfo:{
//       name:"",
//       designation:"",
//       companyName:"",
//       description:"",
//       imageRef:""
//     },
//     industry:"",
//     maxBookingInADay:"",
//     price:"",
//     isDisabled:"boolean",
//     isDeactivated:"boolean"
//   },

// mentorBooking:{
//     id:"",
//     fouderId:"",
//     dateOfBooking:"",
//     isBookingCancelled:"",
//     isBookingRescheduled:"",
//     userId:""
//   },

//   mentorIndustry:{
//     industryName:"",
//     isActiveForAssignment:"",
//     isDeactiavtedForBooking:"",
//   },
