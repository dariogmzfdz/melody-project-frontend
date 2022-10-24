import React from "react";
import "./Top.css";
import SongImg from "../../assets/album-img.jpg";
import PlayButton from "@mui/icons-material/PlayArrow";
import HeartButton from "@mui/icons-material/Favorite";

function Top() {
  const song = (
    <div className="container-song">
      <div className="cover-container">
        <img src={SongImg} alt="song-img" />
      </div>
      <div className="info-container">
        <span>Song Title</span>
        <div className="contributors">
          <p className="track-artist">Artist Name</p>
        </div>
      </div>
      <p className="duration">00:00</p>
      <PlayButton />
      <HeartButton />
    </div>
  );
  return (
    <div className="top-songs-container">
      <h1>Top Songs</h1>
      <section>{song}</section>
      <section>{song}</section>
      <section>{song}</section>
      <section>{song}</section>
      <section>{song}</section>
    </div>
  );
}

export default Top;
