import React from "react";
import { Routes, Route } from "react-router-dom";

import DashBoard from "../sidebarPages/DashBoard";
import ConnectMentors from "../sidebarPages/ConnectMentors";
import FoundersGromming from "../sidebarPages/FoundersGromming";
import RequestACallback from "../sidebarPages/RequestACallback";
import StartupSupport from "../sidebarPages/StartupSupport";
import Step1 from "../Components/BusinessGrooming/Step1";
import Step2 from "../Components/BusinessGrooming/Step2";
import Step3 from "../Components/BusinessGrooming/Step3";
import Step4 from "../Components/BusinessGrooming/Step4";
import Step5 from "../Components/BusinessGrooming/Step5";
import Step6 from "../Components/BusinessGrooming/Step6";
import Step7 from "../Components/BusinessGrooming/Step7";
import Box from "@mui/material/Box";

const MyRoutes = () => {
  return (
    <>
     <Box
        component="main"
        sx={{ flexGrow: 1, mt: 8, p: 4, height: "100vh", overflow: "scroll" }}
      >       
      <Routes>
        <Route index element={<DashBoard />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/connectmentors" element={<ConnectMentors />} />
        <Route path="/founder'sgromming" element={<FoundersGromming />} />
        <Route path="/requestacallback" element={<RequestACallback />} />
        <Route path="/stratupsupport" element={<StartupSupport />} />
        <Route path="/dashboard/step1" element={<Step1 />} />
        <Route path="/dashboard/step2" element={<Step2 />} />
        <Route path="/dashboard/step3" element={<Step3 />} />
        <Route path="/dashboard/step4" element={<Step4 />} />
        <Route path="/dashboard/step5" element={<Step5 />} />
        <Route path="/dashboard/step6" element={<Step6 />} />
        <Route path="/dashboard/step7" element={<Step7 />} />
      </Routes>
      </Box>
    </>
  );
};
export default MyRoutes;
