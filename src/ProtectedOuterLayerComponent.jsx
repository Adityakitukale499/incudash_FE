import { Box } from "@mui/material";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";

function ProtectedOuterLayerComponent({ children }) {
  const location = useLocation();
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('jwt')) navigate('/login')
    // console.log(localStorage.getItem('jwt'));
  },[localStorage.getItem('jwt')]);
  // console.log(location.pathname);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt:
            location.pathname === "/signup" || location.pathname === "/login"
              ? 0
              : 8,
          ml:
            location.pathname === "/signup" || location.pathname === "/login"
              ? 0
              : 8,
          p:
            location.pathname === "/signup" || location.pathname === "/login"
              ? 0
              : 4,
          height: "100vh",
          overflow: "scroll",
        }}
      >
        {location.pathname === "/signup" ||
        location.pathname === "/login" ? null : (
          <SideBar />
        )}
        {children}
      </Box>
      {/* <Component/> */}
    </>
  );
}

export default ProtectedOuterLayerComponent;
