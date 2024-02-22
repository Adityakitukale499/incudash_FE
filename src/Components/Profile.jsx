import React from "react";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";
import Person2Icon from "@mui/icons-material/Person2";
import PasswordIcon from "@mui/icons-material/Password";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

export default function Profile({ handleLogout, user }) {
  const navigate = useNavigate();
  return (
    <Dropdown>
      <MenuButton variant="plain" endDecorator={<ArrowDropDown />}>
        {user?.name?.firstName
          ? user.name.firstName + " " + user.name.lastName
          : user?.username
          ? user?.email
          : ""}
      </MenuButton>
      <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
        <MenuItem
          onClick={() => {
            navigate("/editprofile");
          }}
        >
          <Person2Icon sx={{ color: "#009aca" }} /> Profile Update
        </MenuItem>
        <MenuItem onClick={() => navigate("/changepassword")}>
          <PasswordIcon sx={{ color: "#009aca" }} /> Change Password
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon sx={{ color: "#009aca" }} /> Sign-out
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
