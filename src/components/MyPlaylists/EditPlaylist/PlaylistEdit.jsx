import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../playlists.css";
import EditPlaylistModal from "../EditPlaylist/EditPlaylistModal";
import { Box } from "@mui/system";
import convertDuration from "../../../functions/ConvertDuration";
import SuggestSong from "./SuggestSong";
import { useGetAllSongsQuery } from "../../../redux/services/melodyApi";
import "../../Favorites/Favorites";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function PlaylistViewSongs() {
  const [playlist, setPlaylist] = useState({});
  const [randomSongs, setRandomSongs] = useState([]);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetAllSongsQuery();

  useEffect(() => {
    const token = localStorage.getItem("userToken") || null;

    const fetchPlaylist = async () => {
      const response = await fetch(
        //https://melodystream.herokuapp.com/playlist/${playlistID}
        `https://melodystream.herokuapp.com/playlist/user/playlist`,
        {
          headers: {
            auth_token: token,
          },
        }
      );

      try {
        const data = await response.json();
        const lastPlaylistCreated = Object.values(data.data).pop();
        setPlaylist(lastPlaylistCreated);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylist().catch(console.error);
  }, []);

  // const refreshRandomSongs = () => {
  //   setRandomSongs(getMultipleRandom());
  // };

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <>
      <div className="flex flex-col ml-80 font-mons text-white h-full">
        <div className="flex items-center h-64 mb-1">
          <img
            className="w-56 h-56 rounded-lg"
            src={playlist?.thumbnail}
            alt="thumbnail"
          />
          <section className="flex flex-col justify-center grow ml-5">
            <h1 className=" not-italic text-6xl font-black whitespace-nowrap text-ellipsis leading-80">
              {playlist?.name}
            </h1>
            <p>{playlist?.description}</p>
            <div className="playlist-description">
              <p>{!playlist?.publicAccessible ? "Private" : "Public"}</p>
              <p>{playlist?.tracks?.length} songs</p>
            </div>
          </section>
        </div>
        <div>
          <EditPlaylistModal playlist={playlist} />
        </div>
        <div>
          <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 22 }}>
            Suggestions
          </Typography>
          {/* {tracks} */}
          {data.songs.slice(0, 7).map((song, i) => (
            <SuggestSong
              key={song._id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              i={i}
              convertDuration={convertDuration}
            />
          ))}
        </div>
        <Button
          sx={{
            color: "white",
            borderColor: "white",
            m: 2,
            p: 1,
            pl: 3,
            pr: 3,
          }}
          variant="outlined"
        >
          REFRESH
        </Button>
      </div>
    </>
  );
}

export default PlaylistViewSongs;
