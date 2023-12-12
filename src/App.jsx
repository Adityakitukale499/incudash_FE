import theme from "./Theme/theme";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyRoutes from "./Routes/MyRoutes";
import Box from "@mui/material/Box";
import { useContext, useEffect, useState } from "react";
import { ideaContext, userContext, signUpContex } from "./contextApi/context";
import axios from "axios";
import Loader from "./Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "./servises/constPath";
import { jwtDecode } from "jwt-decode";
import { getData } from "./servises/apicofig";
import SideBar from "./SideBar";
import ProtectedOuterLayerComponent from "./ProtectedOuterLayerComponent";
// import jwt from 'jsonwebtoken';

function App() {
  const [idea, setIdea] = useState();
  const [loader, setLoader] = useState(false);
  const [stepNum, setstepNum] = useState(0);
  const [user, setUser] = useState();
  const [signUpUserId, setSignUpUserId] = useState("");
  const successMgs = () => toast.success("Save Successfully!");
  const faildMgs = () => toast.warning("Faild to Save!");

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const userId = jwtDecode(localStorage.getItem("jwt")).id;
      setLoader(true);
      getData(`users/${userId}`)
        .then(function (response) {
          // console.log("response.data");
          setUser(response.data);
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);
        });
      setLoader(true);
      getData(`ideas/findByUserId/${userId}`)
        .then(function (response) {
          // console.log(response.data);
          setIdea(response.data);
          setstepNum(response.data.stepNum);
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoader(false);
        });
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <userContext.Provider value={{ user, setUser }}>
            <ideaContext.Provider
              value={{
                idea,
                setIdea,
                loader,
                setLoader,
                successMgs,
                faildMgs,
                stepNum,
                setstepNum,
              }}
            >
              <signUpContex.Provider value={{ signUpUserId, setSignUpUserId }}>
                <Box sx={{ backgroundColor: "#F5F7FA", display: "flex" }}>
                  <MyRoutes />
                </Box>
                <Loader loader={loader} />
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />
              </signUpContex.Provider>
            </ideaContext.Provider>
          </userContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
