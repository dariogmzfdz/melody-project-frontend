import React from "react";
import "./SideMenu.css";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useMediaQuery } from "react-responsive";

const drawerWidth = 240;

function SideMenu() {
  const [value, setValue] = React.useState(0);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 450px)",
  });

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {["Home", "Playlists", "Favorites", "Upload song"].map((text, index) => (
          <Link
            key={index + 1}
            to={
              text === "Home"
                ? "/home"
                : text === "Favorites"
                ? "/favorites"
                : text === "Favorites"
                ? "/favorites"
                : text === "Playlists"
                ? "/playlists"
                : text === "Albums"
                ? "/albums"
                
                : text === "Upload song"
                ? "/songs"
                : ""
                
            }
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <Link to="/"> <List>
        {["Logout"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List></Link>
    </div>
  );

  const mobileMenu = (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to="/home">
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        </Link>
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <Link to="/favorites">
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </Link>
        <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );

  return (
    <>
      {isDesktop && (
        <>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                zIndex: 1,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </>
      )}
      {isPhone && mobileMenu}
    </>
  );
}

export default SideMenu;
