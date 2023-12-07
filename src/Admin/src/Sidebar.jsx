import { useContext, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, Link, useNavigate, NavLink, } from "react-router-dom";
import { Button, CardMedia } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import GroupIcon from '@mui/icons-material/Group';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
// import Profile from "./Components/Profile";
// import { userContext } from "./contextApi/context";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectMenuItem, setSelectMenuItem] = useState('')
  const navigate = useNavigate();
  const MenuList = [
    {
      item: "Users Information",
      icon: <GroupIcon/>,
    },
    {
      item: "Idea",
      icon: <ModelTrainingIcon/>,
    },
    // {
    //   item: "Stratup Support",
    //   icon: <GroupIcon/>,
    // },
     {
      item: "Founder's Grooming",
      icon: <GroupIcon/>,
    },
    {
      item: "Mentor Grooming",
      icon: <GroupIcon/>,
    },
  ];
//   const {user ,setUser} = useContext(userContext)

//   const handleLogout = () => {
//     localStorage.setItem("jwt", "");
//     localStorage.setItem("id", "");
//     navigate("/login");
//   };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#fff", color: "#505050", boxShadow: 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{
              marginLeft: -2,
              // marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            {/* <img src="https://incudash.com/assets/public/dashboard/images/sidelogo.png" alt="I" style={{height:40}} /> */}
            <MenuIcon />
          </IconButton>
          <Typography noWrap component="div"></Typography>
          <Box width={"100%"} display={"flex"} justifyContent={"end"} mr={5}>
            {/* <Profile handleLogout={handleLogout} user={user}/> */}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <CardMedia
            component="img"
            height="50"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqsGmeujPuFNcJ3D7Ms_xMDkyfyU2or8tSiBDQTFB1&s"
            alt="incudash"
            onClick={() => setOpen(!open)}
          />
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MenuList.map((e, i) => (
            <ListItem
              key={i}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate(e.item.split(" ").join("").toLowerCase())}
            >
              <ListItemButton
               onClick={()=> setSelectMenuItem(e.item)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: selectMenuItem === e.item?'#0dcaf0':''
                  }}
                >
                 <NavLink
                    to={e.item.split(" ").join("").toLowerCase()}
                    style={({ isActive }) => ({
                      color: isActive ? "#0dcaf0" : "black",
                      textDecoration: "none",
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "28px",
                    })}
                    onClick={() => scrollTop()}
                  >
                    {e.icon}
                    <br />
                  </NavLink>
                </ListItemIcon>
                <ListItemText primary={e.item} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Outlet />
      </Drawer>
    </>
  );
}
