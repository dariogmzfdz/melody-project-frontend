import React from "react";
import { useState, useEffect } from "react";
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
import convertDuration from "../../functions/ConvertDuration";
import convertDurationPlaylist from "../../functions/ConvertDurationPlaylist";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

function Favorites() {
  const [data, setData] = useState([]);
  /*   const token = localStorage.getItem("userToken"); */

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melodystream.herokuapp.com/song/all-songs"
      );
      const result = await response.json();
      const data = result.songs;
      setData(data);
    };

    fetchData().catch(console.error);
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://melodystream.herokuapp.com/song/all-songs"
      );
      const result = await response.json();
      const data = result.songs;
      setData(data);
    };

    fetchData().catch(console.error);
  }, []);
  const songHandler = () => {
    const Track = [...data];
    localStorage.setItem('Track', JSON.stringify(Track));
    console.log(Track);
  };
  console.log(data);
  
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

  const totalDuration = data.map((song) => song.duration);

  return (
    <>
      {isDesktop && (
        <>
          <div className="container-right">
            <header>
              <section className="info">
                <h6>My songs</h6>
                <h1>Favorites</h1>
                <div className="details">
                  <p>{data.length} Songs</p>
                  <p id="dot">&bull;</p>
                  <p>{convertDurationPlaylist(totalDuration)}</p>
                </div>
              </section>
            </header>
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Genre</th>
                  <th id="duration-header">Duration</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((song, index) => (
                  <tr key={song.id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>{song.title}</p>
                    </td>
                    <td>
                      <p>{song.artist}</p>
                    </td>
                    <td>
                      <p>{song.genre}</p>
                    </td>
                    <td className="duration-field">
                      {convertDuration(song.duration)}
                    </td>
                    <td>
                      <PlayButton onClick={songHandler} />
                    </td>
                    <td>
                      <HeartButton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SideMenu />
          <MusicPlayer />
        </>
      )}

      {isPhone && (
        <>
          <MobileTop />
          {searchBar}
          {data.map((song) => (
            <div key={song._id} className="container-song-favorites">
              <div className="cover-container">
                <img src={SongImg} alt="song-img" />
              </div>
              <div className="info-container">
                <span>{song.name}</span>
                <div className="contributors">
                  <p className="track-artist">{song.artist}</p>
                </div>
              </div>
              <div className="song-details">
                <p className="duration">{convertDuration(song.duration)}</p>
                <HeartButton />
              </div>
            </div>
          ))}
          <SideMenu />
        </>
      )}
      <MusicPlayer />
    </>
  );
}

export default Favorites;