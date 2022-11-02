import React from "react";
import "./AlbumCard.css";

function CardAlbum({ title, imgSrc }) {
  return (
    <>
      <img src={imgSrc} alt="album-img" className="card-album" />
      <p className="album-title">{title}</p>
    </>
  );
}

export default CardAlbum;
