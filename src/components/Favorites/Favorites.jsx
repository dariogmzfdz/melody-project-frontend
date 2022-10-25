import React from "react";
import "./Favorites.css";
import { styled, alpha } from "@mui/material/styles";
import { useMediaQuery } from "react-responsive";
import MobileTop from "../MobileTop/MobileTop";
import SideMenu from "../SideMenu/SideMenu";
import SongImg from "../../assets/album-img.jpg";
import PlayButton from "@mui/icons-material/PlayArrow";
import HeartButton from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

function Favorites() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 450px)",
  });

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
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
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const song = (
    <div className="container-song-favorites">
      <div className="cover-container">
        <img src={SongImg} alt="song-img" />
      </div>
      <div className="info-container">
        <span>Song Title</span>
        <div className="contributors">
          <p className="track-artist">Artist Name</p>
        </div>
      </div>
      <div className="song-details">
        <p className="duration">00:00</p>
        <HeartButton />
      </div>
    </div>
  );

  const searchBar = (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search in your favorites songs…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );

  return (
    <>
      {isDesktop && (
        <>
          <SideMenu />
        </>
      )}

      {isPhone && (
        <>
          <MobileTop />
          {searchBar}
          {song}
          <SideMenu />
        </>
      )}
    </>
  );
}

export default Favorites;
