import React from "react";
import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import SongImg from "../../../assets/album-img.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function SuggestSong({
  song,
  isPlaying,
  activeSong,
  data,
  i,
  convertDuration,
}) {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
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
        <FavoriteIcon className="favoriteIcon"/>
      </button>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography sx={{ p: 1 }}>
            {convertDuration(song.duration)}
          </Typography>
        </div>
        <Button variant="text" sx={{ color: "#444444" }}>
          <PlaylistAddIcon />
        </Button>
      </Box>
    </div>
  );
}

export default SuggestSong;
