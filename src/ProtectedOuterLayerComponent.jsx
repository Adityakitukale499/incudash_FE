import { Box } from "@mui/material";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSideBar from "./Admin/src/AdminSidebar";

function ProtectedOuterLayerComponent({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("jwt")) navigate("/login");
    // console.log(localStorage.getItem('jwt'));
  }, [localStorage.getItem("jwt")]);
  // console.log(location.pathname);
  const authPath = ["/signup",
  "/login", "/reset-password",]
  const paths = [   
    "/admin",
    "/admin/mentorgrooming",
    "/admin/usersinformation",
    "/admin/idea",
    "/admin/founder'sgrooming",
    "/admin/mentorgrooming",
  ];
  return (
    <>
      {paths.includes(location.pathname) ? authPath.includes(location.pathname)? null:<AdminSideBar/> :<SideBar/>}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: paths.includes(location.pathname) ? 0 : 8,
          ml: paths.includes(location.pathname) ? 0 : 0,
          p: paths.includes(location.pathname) ? 0 : 4,
          height: "100vh",
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
      {/* <Component/> */}
    </>
  );
}

export default ProtectedOuterLayerComponent;
