import * as React from "react";

import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import SongImg from "../../../assets/album-img.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import axios from "axios";

function SuggestSong({
  song,
  lastPlaylist,
  userPlaylists,
  isPlaying,
  activeSong,
  data,
  i,
  convertDuration,
}) {
  const token = localStorage.getItem("userToken") || null;

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  //? Popover button add song to any playlist
  // const showUserPlaylists = userPlaylists.map((playlist) => {
  //   return (
  //     <div key={playlist?._id}>
  //       <Typography sx={{ p: 2 }}>{playlist?.name}</Typography>
  //     </div>
  //   );
  // });

  const addSuggestSong = async (e, songId) => {
    e.preventDefault();
    const playlistId = lastPlaylist?._id;
    const songsId = songId;

    const options = {
      url: `http://localhost:4000/playlist/add-song/${playlistId}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;text/html;charset=UTF-8",
      },
      data: songsId,
    };

    try {
      const result = await axios(options);
      console.log(result.msg);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container-song">
      <div className="cover-container">
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          className="playpause"
        />
      </div>
      <div className="info-container">
        <span>{song.title}</span>
        <div className="contributors">
          <p className="track-artist">{song.artist}</p>
        </div>
      </div>
      <button>
        <FavoriteIcon className="favoriteIcon" />
      </button>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography sx={{ p: 1 }}>
            {convertDuration(song.duration)}
          </Typography>
        </div>
        <div>
          <button onClick={(e) => addSuggestSong(e, song._id)}>
            <PlaylistAddIcon />
          </button>
        </div>
      </Box>
    </div>
  );
}

export default SuggestSong;
