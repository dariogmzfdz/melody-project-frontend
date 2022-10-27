import React from "react";
import { useState, useEffect } from "react";
import "./Favorites.css";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from "react-responsive";
import MobileTop from "../MobileTop/MobileTop";
import SideMenu from "../SideMenu/SideMenu";
import SongImg from "../../assets/album-img.jpg";
import HeartButton from "@mui/icons-material/Favorite";
import InputBase from "@mui/material/InputBase";
import convertDuration from "../../functions/ConvertDuration";
import convertDurationPlaylist from "../../functions/ConvertDurationPlaylist";
import { IconButton } from "@mui/material";
import MaterialPlayer from "../MaterialPlayer/MaterialPlayer";
import PlayButton from "../Buttons/PlayButton";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { CircularProgress, IconButton } from "@mui/material";
import { Clear, SearchRounded } from "@mui/icons-material";

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

  // const Search = styled("div")(({ theme }) => ({
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // }));

  // const SearchIconWrapper = styled("div")(({ theme }) => ({
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // }));

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

  const songHandler = (
    songId,
    songUrl,
    songTitle,
    songArtist,
    songDuration,
    songGenre
  ) => {
    //  new Track = (songUrl,songTitle,songArtist,songDuration,songGenre)
    const Track = [
      { songId, songUrl, songTitle, songArtist, songDuration, songGenre },
    ];
    localStorage.setItem("Track", JSON.stringify(Track));
    console.log(Track);
  };
  const totalDuration = data.map((song) => song.duration);

  //---- SEARCH BAR ---> START

  const [track, setTrack] = useState();
  const [inputTrack, setInputTrack] = useState("");
  // const {songTitle} = searchTrack

  function getTrack() {
    // Find track information in data using track
    let music = Object.values(data).find((song) => {
      return song.title.toLowerCase().includes(inputTrack.toLowerCase());
    });
    setTrack(music);
    // display the track
  }

  const handleSearch = (event) => {
    setInputTrack(event.target.value);
  };

  //Create function to clear state search
  function handleSearchClear(e) {
    setInputTrack("");
  }

  console.log("input Title: ", inputTrack);
  console.log("Track: ", track);

  //---- SEARCH BAR  ---> END
  return (
    <>
      {isDesktop && (
        <>
          <SideMenu />

          <div className="container">
            <div className="search_input_container">
              <IconButton onClick={getTrack}>
                <SearchRounded />
              </IconButton>
              <input
                type="text"
                placeholder="Search for songs and playlists"
                name="songTitle"
                onChange={handleSearch}
                value={inputTrack}
              />
              <IconButton onClick={handleSearchClear}>
                <Clear />
              </IconButton>
            </div>
          </div>

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
                {track && (
                  <tr key={track._id} style={{ backgroundColor: "#764daf" }}>
                    <td></td>
                    <td>
                      <p>{track.title}</p>
                    </td>
                    <td>
                      <p>{track.artist}</p>
                    </td>
                    <td>
                      <p>{track.genre}</p>
                    </td>
                    <td className="duration-field">
                      {convertDuration(track.duration)}
                    </td>
                    <td>
                      <PlayButton
                        onClick={() =>
                          songHandler(
                            track._id,
                            track.url,
                            track.title,
                            track.artist,
                            track.duration,
                            track.genre
                          )
                        }
                      />
                    </td>
                    <td>
                      <HeartButton />
                    </td>
                  </tr>
                )}
                {data.map((song, index) => (
                  <tr key={song._id}>
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
                      <IconButton>
                        <PlayButton song={song} />
                      </IconButton>
                      <PlayButton
                        onClick={() =>
                          songHandler(
                            song._id,
                            song.url,
                            song.title,
                            song.artist,
                            song.duration,
                            song.genre
                          )
                        }
                      />
                    </td>
                    <td>
                      <IconButton>
                        <HeartButton sx={{ color: "white" }} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MaterialPlayer />
          <SideMenu />
          <MusicPlayer />
        </>
      )}

      {isPhone && (
        <>
          <MobileTop />
          {/* {searchBar} */}
          {data.map((song) => (
            <div key={song._id} className="container-song-favorites">
              <div className="cover-container">
                <img src={SongImg} alt="song-img" />
              </div>
              <div className="info-container">
                <span>{song.title}</span>
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
