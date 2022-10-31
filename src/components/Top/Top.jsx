import React from "react";
import "./Top.css";
import { useGetLikedSongsQuery } from "../../redux/services/melodyApi";
import SongCart from "./SongCart";

function Top() {
  const { data, isFetching, error } = useGetLikedSongsQuery();

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div className="top-songs-container">
      <h1>Liked Songs</h1>
      <section>
        {data?.songs.length > 0 ? (
          data.songs.slice(0, 8).map((card) => {
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
