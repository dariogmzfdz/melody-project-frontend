import React from "react";
import "./Top.css";

import SongCart from "./SongCart"


function Top( {favourites}) {
 
  return (
    <div className="top-songs-container">
      <h1>Liked Songs</h1>
      <section>{ favourites?.length > 0 ? favourites.slice(0, 8).map((card)=>{
    return  <SongCart key={card._id} title={card.title} artist={card.artist} duration={card.duration}/>
  }) :  <h2>no data</h2>}
  
  </section>
      
    </div>
  );
}

export default Top;
