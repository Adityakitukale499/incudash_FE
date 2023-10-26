import { Box } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

function ProtectedOuterLayerComponent({ children }) {
  
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt:location.pathname === "/signup" || location.pathname === "/login"? 0: 8,
          ml:location.pathname === "/signup" || location.pathname === "/login"? 0: 8,
          p:location.pathname === "/signup" || location.pathname === "/login"? 0: 4,
          height: "100vh",
          overflow: "scroll",
        }}
      >
        {location.pathname === "/signup" || location.pathname === "/login" ? null :<SideBar />}
        {children}
      </Box>
      {/* <Component/> */}
    </>
  );
}

export default ProtectedOuterLayerComponent;
