import React, { useEffect, useState } from "react";
import PlayIcon from "@mui/icons-material/PlayArrow";
import { PlayerInterface, Track } from "react-material-music-player";

const PlayButton = ({ song }) => {
  /*   const [track, setTrack] = useState([]);

  const getTheSongClicked = (song) => {
    const track = new Track(
      song.title,
      song.artist,
      song.album,
      song.cover,
      song.url
    );
    setTrack(track);
  };

  useEffect(() => {
    getTheSongClicked(song);
  }, [song]); */

  console.log(song);

  return <PlayIcon sx={{ color: "white" }} />;
};

export default PlayButton;
