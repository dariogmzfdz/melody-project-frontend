import React from "react";
import { useSelector } from "react-redux";
import "./Top.css";
import { useGetLikedSongsQuery } from "../../redux/services/melodyApi";
import SongCart from "./SongCart";
import { Link } from "react-router-dom";
import convertDuration from "../../functions/ConvertDuration";

function Top() {
  const { data, isFetching, error } = useGetLikedSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div className="top-songs-container">
      <h1 className="mb-3 not-italic font-bold font-mons text-xl text-white">
        Liked Songs
      </h1>
      <section>
        {data?.songs.length > 0 ? (
          data.songs.slice(0, 8).map((song, i) => {
            return (
              <SongCart
                key={song._id}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={i}
                convertDuration={convertDuration}
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
