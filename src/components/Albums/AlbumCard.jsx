import React from "react";
import "./AlbumCard.css";




function CardAlbum({title,imgSrc}) {  



  return (
    <div className="album">
      <img src={imgSrc} alt="album-img" className="card-album" />
      <p className="Album-Title">{title}</p>
    </div>
  );
}

export default CardAlbum;
