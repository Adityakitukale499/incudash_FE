import { Box } from "@mui/material";
import { useState } from "react";
import './App.css'
import AdminSideBar from "./AdminSidebar";
const App = () => {
  return (
    <>
      <Box sx={{display : "flex", backgroundColor: "#F5F7FA"}}>
        <AdminSideBar />
        </Box>
    </>
  );
};

export default App;
