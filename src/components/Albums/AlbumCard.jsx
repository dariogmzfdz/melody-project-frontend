import React from "react";
import "./AlbumCard.css";
import AlbumImg from "../../assets/album-img.jpg";

function CardAlbum() {
  return (
    <div className="album">
      <img src={AlbumImg} alt="album-img" className="card-album" />
      <p className="Album-Title">Album Title</p>
    </div>
  );
}

export default CardAlbum;
