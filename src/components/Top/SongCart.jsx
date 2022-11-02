import React from "react";
import { useDispatch } from "react-redux";
import "./Top.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayPause from "../SongCard/PlayPause";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";
import convertDuration from "../../functions/ConvertDuration";
import { Box, Typography } from "@mui/material";

function SongCart({ song, isPlaying, activeSong, data, i }) {
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
          className="playpause"
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
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
      </Box>
    </div>
  );
}

export default SongCart;
