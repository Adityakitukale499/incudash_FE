
import SideBar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import MyRoutes from "./Routes/myRoutes";
import { loaderContext } from "./ContextApi/context";
import Loader from "./Components/Loader/Loader";
import { useState } from "react";
import './App.css'
const App = () => {
  const [loader, setLoader] = useState(false)
  return (
    <>
      {/* <BrowserRouter> */}
      <loaderContext.Provider value={{loader, setLoader}}>
      <Box sx={{display : "flex", backgroundColor: "#F5F7FA"}}>
        <SideBar />
        <MyRoutes/>
        </Box>
        <Loader loader={loader}/>
        </loaderContext.Provider>
      {/* </BrowserRouter>   */}
    </>
  );
};

export default App;
