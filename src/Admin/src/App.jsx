import { Box } from "@mui/material";
import MyRoutes from "./Routes/myRoutes";
// import { loaderContext } from "./ContextApi/context";
// import Loader from "./Components/Loader/Loader";
import { useState } from "react";
import './App.css'
import AdminSideBar from "./AdminSidebar";
const App = () => {
  // const [loader, setLoader] = useState(false)
  return (
    <>
      {/* <BrowserRouter> */}
      {/* <loaderContext.Provider value={{loader, setLoader}}> */}
      <Box sx={{display : "flex", backgroundColor: "#F5F7FA"}}>
        <AdminSideBar />
        {/* <MyRoutes/> */}
        </Box>
        {/* <Loader loader={loader}/> */}
        {/* </loaderContext.Provider> */}
      {/* </BrowserRouter>   */}
    </>
  );
};

export default App;
