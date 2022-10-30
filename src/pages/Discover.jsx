import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SongCard from "../components/SongCard/SongCard";
import { useGetAllSongsQuery } from "../redux/services/melodyApi";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetAllSongsQuery();

  console.log(data.songs);
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover</h2>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.songs.map((song, i) => (
          <SongCard
            key={song._id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
