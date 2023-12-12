import { Box } from "@mui/material";
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSideBar from "./Admin/src/AdminSidebar";

function ProtectedOuterLayerComponent({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const authPath = ["/signup",
  "/login", "/reset-password",]
  const paths = [   
    "/admin",
    "/admin/mentorgrooming",
    "/admin/admin/mentorgrooming",
    "/admin/usersinformation",
    "/admin/admin/usersinformation",
    "/admin/idea",
    "/admin/admin/idea",
    "/admin/founder'sgrooming",
    "/admin/admin/founder'sgrooming",
    // "/admin/idea/:userId"
  ];
  useEffect(() => {
    if (!localStorage.getItem("jwt") && !authPath.includes(location.pathname)) navigate("/login");
    // console.log(localStorage.getItem('jwt'));
  }, [localStorage.getItem("jwt")]);
  // console.log(location.pathname);
  
  return (
    <>
      {paths.includes(location.pathname) ? <AdminSideBar/>: authPath.includes(location.pathname)?null :<SideBar/>}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: authPath.includes(location.pathname) ? 0 : 8,
          ml: authPath.includes(location.pathname) ? 0 : 0,
          p: authPath.includes(location.pathname) ? 0 : 4,
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
