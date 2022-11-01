import * as React from "react";

import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import SongImg from "../../../assets/album-img.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

function Songs({
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
    const id = lastPlaylist?._id;
    const options = {
      url: `http://localhost:4000/playlist/add-song/${id}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: songId,
    };

    try {
      const result = await axios(options);
      console.log(result);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container-song">
      <div className="cover-container">
        <img src={SongImg} alt="song-img" />
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        className="playpause"
      />
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
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            <PlaylistAddIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Insert playlist name</Typography>
          </Popover>
        </div>
      </Box>
    </div>
  );
}

export default Songs;
