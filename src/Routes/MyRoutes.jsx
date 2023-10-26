import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import Login from "../authPages/Login";
import SignUp from "../authPages/SignUp";
import SideBar from "../SideBar";
import ProtectedOuterLayerComponent from "../ProtectedOuterLayerComponent";
import { sidebarRoute ,stepRoute, authRoute } from "../servises/constPath";


const MyRoutes = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <>
      <ProtectedOuterLayerComponent>
        <Routes>
          <Route>
            <Route index element={<DashBoard />} />
            <Route path={sidebarRoute.dashboard} element={<DashBoard />} />
            <Route path={sidebarRoute.connectmentors} element={<ConnectMentors />} />
            <Route path={sidebarRoute.foundersRouteromming} element={<FoundersGromming />} />
            <Route path={sidebarRoute.requestacallback} element={<RequestACallback />} />
            <Route path={sidebarRoute.stratupsupport} element={<StartupSupport />} />
            <Route path={stepRoute.step1} element={<Step1 />} />
            <Route path={stepRoute.step2} element={<Step2 />} />
            <Route path={stepRoute.step3} element={<Step3 />} />
            <Route path={stepRoute.step4} element={<Step4 />} />
            <Route path={stepRoute.step5} element={<Step5 />} />
            <Route path={stepRoute.step6} element={<Step6 />} />
            <Route path={stepRoute.step7} element={<Step7 />} />
          </Route>
          <Route path={authRoute.login} element={<Login />} />
          <Route path={authRoute.signup} element={<SignUp />} />
        </Routes>
      </ProtectedOuterLayerComponent>
      {/* </Box> */}
    </>
  );
};
export default MyRoutes;
