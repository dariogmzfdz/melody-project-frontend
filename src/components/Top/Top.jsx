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
      <Link
        to="/favorites"
        class="text-black bg-white hover:bg-gray-400 font-medium rounded-lg text-sm
        px-5 py-2.5 text-center inline-flex items-center"
      >
        {" "}
        See all
        <svg
          aria-hidden="true"
          class="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Link>
    </div>
  );
}

export default Top;
