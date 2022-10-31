import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { CircularProgress, IconButton } from "@mui/material";
import { Clear, SearchRounded } from "@mui/icons-material";
import SongCard from "../SongCard/SongCard";
import { useGetAllSongsQuery } from "../../redux/services/melodyApi";
import axios from "axios";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { getRandomSongs } from "../../redux/features/playerSlice";

function Favorites() {
  const { data, isFetching, error } = useGetAllSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const token = localStorage.getItem("userToken");

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 450px)",
  });

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

  //---- SEARCH BAR ---> START

  const [track, setTrack] = useState();
  const [randomSongs, setRandomSongs] = useState([]);
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

  /* console.log("input Title: ", inputTrack);
  console.log("Track: ", track); */

  //---- SEARCH BAR  ---> END

  // const putLikedSong = async (favorite) => {

  // try {
  //   const data = await axios.put(
  //     `https://melodystream.herokuapp.com/song/like/${favorite}`,

  //     {
  //       headers: {
  //         auth_token: token,
  //       }
  //     }
  //     )
  //        const response = await data.json();

  //     }
  //     catch (data) {
  //       const { msg } = data.response.data;
  //       console.log(msg);

  //     }    }
  /* const putLikedSong = {
    method: "PUT",
    headers: { auth_token: token },
  };
  const fetchLikedSong = async () =>
    await fetch(
      `https://cors-anywhere.herokuapp.com/https://melodystream.herokuapp.com/song/like/${favorite}`,
      putLikedSong
    );

  const changeFavorite = (id) => {
    setFavorite([id]);
    data.songs.map((song) => {
      const { _id } = song;
      if (_id === id) {
        song.favorite = !song.favorite;
      }
    });
    console.log(favorite);
    // putLikedSong(favorite);
    fetchLikedSong();
  }; */

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  const totalDuration = data.songs.map((song) => song.duration);

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
                  <p>{data.songs.length} Songs</p>
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
                {data.songs.map((song, i) => (
                  <SongCard
                    key={song._id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={i}
                    convertDuration={convertDuration}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <SideMenu />
        </>
      )}

      {isPhone && (
        <>
          <MobileTop />
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
    </>
  );
}

export default Favorites;
