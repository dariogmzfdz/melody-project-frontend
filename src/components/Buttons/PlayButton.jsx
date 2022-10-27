import React, { useEffect, useState } from "react";
import PlayIcon from "@mui/icons-material/PlayArrow";
import { PlayerInterface, Track } from "react-material-music-player";

const PlayButton = ({ song }) => {
  const [track, setTrack] = useState([]);

  const getTheSongClicked = (song) => {
    const track = {
      title: song.title,
      artist: song.artist,
      album: song.album,
      artwork: song.cover,
      src: song.url,
    };
    setTrack(track);
  };

  useEffect(() => {
    getTheSongClicked(song);
  }, [song]);

  console.log(track);

  return (
    <PlayIcon
      sx={{ color: "white" }}
      onClick={() => {
        PlayerInterface.play(track);
      }}
    />
  );
};

export default PlayButton;
