import React from "react";
import "./Top.css";

import SongCart from "./SongCart";

function Top({ favorites }) {
  return (
    <div className="top-songs-container">
      <h1>Liked Songs</h1>
      <section>
        {favorites?.length > 0 ? (
          favorites.slice(0, 8).map((card) => {
            return (
              <SongCart
                key={card._id}
                title={card.title}
                artist={card.artist}
                duration={card.duration}
              />
            );
          })
        ) : (
          <h2>no data</h2>
        )}
      </section>
    </div>
  );
}

export default Top;
