import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function UserAvatar() {
  //User Data with all information
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const token = localStorage.getItem("userToken");

  const settingAdmin = [
    { text: "Dashboard", href: "/admin", id: "dashboard" },
    { text: "Profile", href: "/profile", id: "profile" },
    { text: "Logout", href: "/logout", id: "logout" },
  ];

  const settingUser = [
    { text: "Profile", href: "/profile", id: "Profile" },
    { text: "Logout", href: "/logout", id: "Logout" },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://melodystream.herokuapp.com/user", {
        headers: {
          auth_token: token,
        },
      });
      const data = await response.json();

      setIsAdmin(data.isAdmin);
      setData(data.user);
    };

    fetchData().catch(console.error);
  }, [token]);

  return (
    <>
      {/* MATERIAL UI */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {isAdmin
            ? settingAdmin.map((settings) => (
                <MenuItem key={settings.id} onClick={handleCloseUserMenu}>
                  <Link to={settings.href}>
                    {" "}
                    <Typography
                      textAlign="center"
                      textDecoration="none"
                      color="black"
                    >
                      {settings.text}
                    </Typography>
                  </Link>
                </MenuItem>
              ))
            : settingUser.map((settings) => (
                <MenuItem key={settings.id} onClick={handleCloseUserMenu}>
                  <Link to={settings.href}>
                    <Typography
                      textAlign="center"
                      textDecoration="none"
                      color="black"
                    >
                      {settings.text}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
        </Menu>
      </Box>
    </>
  );
}

export default UserAvatar;
