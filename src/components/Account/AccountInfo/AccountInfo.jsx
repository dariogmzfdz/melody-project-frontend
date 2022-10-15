import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Account from "../../../assets/account.png";
import "./AccountInfo.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import image from "../../../utils/img/logo.png";

function AccountInfo() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const token = localStorage.getItem("userToken");
  const settingAdmin = [
    {text: 'Dashboard', href: '/admin' ,id: 'dashboard' },
    {text: 'Profile', href: '/profile' ,id: 'profile'},
    {text: 'Logout', href: '/logout' ,id: 'logout'},
  ];

  const settingUser = [
    {text: 'Profile', href: '/profile', id: 'Profile'},
    {text: 'Logout', href: '/logout' ,id: 'Logout'}, 
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
      const response = await fetch(
        "https://melody-music-stream-ten.vercel.app/user",
        {
          headers: {
            auth_token: token,
          },
        }
      );
      const data = await response.json();
      const user = data.user;
      const admin = user.isAdmin;

      setData(user);
      setIsAdmin(admin);
    };

    fetchData().catch(console.error);
  }, [token]);

  useEffect(() => {
    console.log("isAdmin: ", isAdmin);
  }, [isAdmin]);

  return (
    <>
      {/* MATERIAL UI */}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={image} />
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
          {isAdmin ? 
          settingAdmin.map((settings) => (
             
            <MenuItem  key={settings.id} onClick={handleCloseUserMenu}>
                 <Link to={settings.href}> <Typography textAlign="center" textDecoration='none' color="black">
                {settings.text}
                </Typography></Link>
            </MenuItem>
          ))
          : settingUser.map((settings) => (
            
            <MenuItem key={settings.id} onClick={handleCloseUserMenu}>
               <Link to={settings.href}  >
                <Typography textAlign="center" textDecoration='none' color="black">
                 {settings.text}
                </Typography></Link>
            </MenuItem> 
          ))}
           </Menu>
      </Box>

       
      <button className="account-btn" onClick={() => setIsOpen(true)}>
        <img className="user-img" src={Account} alt="" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before",
        }}
        closeTimeoutMS={500}
      >
        {/* List with the user information */}
        <div className="user-info">
          <div className="user-img-container">
            <img className="user-img" src={Account} alt="" />
          </div>
          <div className="user-data">
            <p className="user-name">Name: {data.name}</p>
            <p className="user-name">LastName: {data.lastName}</p>
            <p className="user-name">Gender: {data.gender}</p>
            <p className="user-email">Email: {data.email}</p>
            <p className="user-email">Date: {data.birthday}</p>
          </div>
        </div>

        {/* Button to close the session */}
        <div className="close-session">
          <button
            className="close-session-btn"
            onClick={() => setIsOpen(false)}
          >
            Close session
          </button>
        </div>

       
      </Modal>
    </>
  );
}

export default AccountInfo;
