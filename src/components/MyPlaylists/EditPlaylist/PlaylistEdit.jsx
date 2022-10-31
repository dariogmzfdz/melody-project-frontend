import React, { useEffect, useState } from "react";
import "../playlists.css";
import ResponsiveAppBar from "../../AppBar/AppBar";
import EditPlaylistModal from "../EditPlaylist/EditPlaylistModal";
import { Box } from "@mui/system";
import convertDuration from "../../../functions/ConvertDuration";
import { FileUpload } from "@mui/icons-material";
import SongImg from "../../../assets/album-img.jpg";

function PlaylistViewSongs() {
  const [playlist, setPlaylist] = useState({});
  console.log(playlist);

  useEffect(() => {
    const token = localStorage.getItem("userToken") || null;

    const fetchPlaylist = async () => {
      const response = await fetch(
        //https://melodystream.herokuapp.com/playlist/${playlistID}
        `http://localhost:4000/playlist/user/playlist`,
        {
          headers: {
            auth_token: token,
          },
        }
      );

      try {
        const data = await response.json();
        const lastPlaylistCreated = Object.values(data.data).pop();
        setPlaylist(lastPlaylistCreated);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylist().catch(console.error);
  }, []);

  const [songs, setSongs] = useState([]);
  // const { errorMsg, setErrorMsg } = React.useState();
  useEffect(() => {
    try {
      fetch("https://melodystream.herokuapp.com/song/all-songs")
        .then((res) => res.json())
        .then((data) => setSongs(data.songs));
    } catch (error) {
      if (error.response) {
        // setErrorMsg(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  }, []);

  const tracks = songs.map((song) => {
    return (
      <div className="container-song">
        <div className="cover-container">
          <img src={SongImg} alt="song-img" />
        </div>
        <div className="info-container">
          <span>{song.title}</span>
          <div className="contributors">
            <p className="track-artist">{song.artist}</p>
          </div>
        </div>
        <p className="duration">{convertDuration(song.duration)}</p>
        <button className="playBtn">{/* <PlayButton /> */} PLAY</button>
        <button className="heartBtn">
          {/* <HeartButton /> */}
          LIKE
        </button>
      </div>
    );
  });

  return (
    <>
      <ResponsiveAppBar />
      <div className="container-playlistView">
        <div className="container-flex">
          <div className="thumbnail">
            <img
              className="thumbnail"
              src={playlist?.thumbnail}
              alt="thumbnail"
            />
          </div>
          <Box sx={{ ml: 4 }}>
            <h2>{playlist?.name}</h2>
            <p>{playlist?.description}</p>
            <div className="playlist-description">
              <p>{!playlist?.publicAccessible ? "Private" : "Public"}</p>
              <p>{playlist?.tracks?.length} songs</p>
            </div>
          </Box>
        </div>
        <div>
          <EditPlaylistModal playlist={playlist} />
        </div>
        <div>
          <h3>Suggestions</h3>
          {tracks}
        </div>
      </div>
    </>
  );
}

export default PlaylistViewSongs;
