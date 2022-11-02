import React from "react";
import "./HomeHeader.css";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { IconButton, Badge } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UserAvatar from "../../AppBar/UserAvatar";

function HomeHeader() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "50ch",
      },
    },
  }));

  const searchBar = (
    <Search className="searchbar-home">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search a song…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );

  return (
    <div className="header-container-home">
      <h1>
        <strong>Hello</strong> User!
      </h1>
      {searchBar}
      <div className="settings-container">
        <IconButton className="classes.settings">
          <SettingsIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <Badge color="secondary" variant="dot">
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </IconButton>
        <UserAvatar />
      </div>
    </div>
  );
}

export default HomeHeader;
