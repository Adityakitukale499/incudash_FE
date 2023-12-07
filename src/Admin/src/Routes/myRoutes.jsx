
import { Route, Routes } from "react-router-dom";
import UsersInformation from "../SidebarPages/UsersInformation";
import UserIdea from "../SidebarPages/UserIdea";
import ViewIdea from "../Components/Pages/ViewIdea";
import { Box } from "@mui/material";
import ResetPassword from "../Authentication/ResetPassword";
import FoundersGrooming from "../SidebarPages/FoundersGrooming";
import MentorGrooming from "../SidebarPages/MentorGrooming";

const MyRoutes = () => {
  return (
    <>
    <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,         
          p: 4,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
      <Routes>
        
      </Routes>
      </Box>
    </>
  );
};

export default MyRoutes;
