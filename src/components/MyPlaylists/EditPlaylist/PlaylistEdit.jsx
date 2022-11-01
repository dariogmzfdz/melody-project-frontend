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
  const token = localStorage.getItem("userToken") || null;
  const [userPlaylists, setUserPlaylists] = useState();
  const [lastPlaylist, setLastPlaylistCreated] = useState({});
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
        setUserPlaylists(data.data);
        setLastPlaylistCreated(lastPlaylistCreated);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylist().catch(console.error);
  }, []);

  function randomIndex(count) {
    return Math.floor(Math.random() * count);
  }

  function getRandomSongs() {
    const randomSongs = [];
    const songs = data.songs;
    const count = songs.length;
    const randomIndexes = new Set();
    while (randomIndexes.size < 5) {
      randomIndexes.add(randomIndex(count));
    }
    for (let index of randomIndexes) {
      randomSongs.push(songs[index]);
    }
    setRandomSongs(randomSongs);
  }

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <>
      <div className="flex flex-col ml-80 font-mons h-full">
        <div className="flex items-center h-64 mb-1">
          <img
            className="w-56 h-56 rounded-lg"
            src={lastPlaylist?.thumbnail}
            alt="thumbnail"
          />
          <section className="flex flex-col justify-center grow ml-5 text-white">
            <h1 className=" not-italic text-6xl font-black whitespace-nowrap text-ellipsis leading-80">
              {lastPlaylist?.name}
            </h1>
            <p>{lastPlaylist?.description}</p>
            <div className="playlist-description">
              <p>{!lastPlaylist?.publicAccessible ? "Private" : "Public"}</p>
              <p>{lastPlaylist?.tracks?.length} songs</p>
            </div>
          </section>
        </div>
        <div>
          <EditPlaylistModal playlist={lastPlaylist} />
        </div>
        <div>
          {lastPlaylist?.tracks?.length === 0 ? (
            <Typography sx={{ color: "#f3f3f3", mt: 2, fontSize: 22 }}>
              Your playlist is empty, we can suggest you some songs!
            </Typography>
          ) : (
            <div>{/* <Songs /> */}</div>
          )}
          {/* {tracks} */}
          {randomSongs.length > 0 ? (
            randomSongs.map((song, i) => (
              <SuggestSong
                key={song._id}
                song={song}
                lastPlaylist={lastPlaylist}
                userPlaylists={userPlaylists}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data}
                i={i}
                convertDuration={convertDuration}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
        {randomSongs.length > 0 ? (
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
            onClick={getRandomSongs}
          >
            REFRESH
          </Button>
        ) : (
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
            onClick={getRandomSongs}
          >
            SUGGEST SONGS
          </Button>
        )}
      </div>
    </>
  );
}

export default PlaylistViewSongs;
