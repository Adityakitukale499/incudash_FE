
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material"

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
