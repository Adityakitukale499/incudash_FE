import theme from "./Theme/theme";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyRoutes from "./Routes/MyRoutes";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ideaContext, userContext } from "./contextApi/context";
import axios from "axios";
import Loader from "./Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "./servises/constPath";
import { jwtDecode } from "jwt-decode";
// import jwt from 'jsonwebtoken';

function App() {
  const [idea, setIdea] = useState();
  const [loader, setLoader] = useState(false);
  const [stepNum, setstepNum] = useState(0);
  const [user, setUser] = useState();

  const successMgs = () => toast.success("Save Successfully!");
  const faildMgs = () => toast.warning("Faild to Save!");

  useEffect(() => {
    setLoader(true);
    if (localStorage.getItem("jwt") != "") {
      const userId = jwtDecode(localStorage.getItem("jwt")).id;
      // console.log(userId);

      axios
        .get(`${baseUrl}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
          setUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(`${baseUrl}/ideas/652f8bff127bd15a1883f5fd`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
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
          <userContext.Provider value={{user, setUser}}>
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
              <Box sx={{ backgroundColor: "#F5F7FA", display:'flex' }}>
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
            </ideaContext.Provider>
          </userContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
