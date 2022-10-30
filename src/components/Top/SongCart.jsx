import React from "react";
import "./Top.css";

import SongImg from "../../assets/album-img.jpg";
import PlayButton from "@mui/icons-material/PlayArrow";
import HeartButton from "@mui/icons-material/Favorite";

import convertDuration from "../../functions/ConvertDuration";



function SongCart({ title, artist, duration}){  


    return (
        <div className="container-song">
      <div className="cover-container">
        <img src={SongImg} alt="song-img" />
      </div>
      <div className="info-container">
        <span>{title}</span>
        <div className="contributors">
          <p className="track-artist">{artist}</p>
        </div>
      </div>
      <p className="duration">{convertDuration(duration)}</p>
      <button  className= "playBtn"><PlayButton/></button>
      <button  className= "heartBtn"><HeartButton/></button>
    
    </div>
    )
}


export default SongCart;
