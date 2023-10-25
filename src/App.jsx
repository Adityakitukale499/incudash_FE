import theme from "./Theme/theme";
import { ThemeProvider } from "styled-components";
import SideBar from "./SideBar";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyRoutes from "./Routes/MyRoutes";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { ideaContext } from "./contextApi/context";
import axios from "axios";
import Loader from "./Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./authPages/Login";
import SignUp from "./authPages/SignUp";

function App() {
  const [idea, setIdea] = useState();
  const [loader, setLoader] = useState(false);
  const [stepNum, setstepNum] = useState(0);
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);

  const successMgs = () => toast.success("Save Successfully!");
  const faildMgs = () => toast.warning("Faild to Save!");

  useEffect(() => {
    setLoader(true);
    axios
      .get("http://localhost:1337/ideas/652f8bff127bd15a1883f5fd", {
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
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
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
            {signup ? <SignUp setSignup={setSignup} setLogin={setLogin}/> : null}
            {login ? <Login  setSignup={setSignup} setLogin={setLogin}/> : null}
            {!login && !signup ? (
              <Box sx={{ display: "flex", backgroundColor: "#dcdfe3" }}>
                <SideBar />
                <MyRoutes />
              </Box>
            ) : null}
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
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
