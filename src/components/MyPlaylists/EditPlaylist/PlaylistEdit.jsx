import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../playlists.css";
import ResponsiveAppBar from "../../AppBar/AppBar";
import EditPlaylistModal from "../EditPlaylist/EditPlaylistModal";
import { Box } from "@mui/system";
import convertDuration from "../../../functions/ConvertDuration";
import { FileUpload } from "@mui/icons-material";
import SongImg from "../../../assets/album-img.jpg";
import PlayPause from "../../SongCard/PlayPause";
import SuggestSong from "./SuggestSong";
import { useGetAllSongsQuery } from "../../../redux/services/melodyApi";
import "../../Favorites/Favorites";
import { Typography } from "@mui/material";

function PlaylistViewSongs() {
  const [playlist, setPlaylist] = useState({});
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetAllSongsQuery();

  useEffect(() => {
    const token = localStorage.getItem("userToken") || null;

    const fetchPlaylist = async () => {
      const response = await fetch(
        //https://melodystream.herokuapp.com/playlist/${playlistID}
        `http://localhost:4000/playlist/user/playlist`,
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

  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <>
      <ResponsiveAppBar />
      <div className="container-playlistEdit">
        <div className="container_playlist__detail">
          <div className="thumbnail">
            <img
              className="thumbnail"
              src={playlist?.thumbnail}
              alt="thumbnail"
            />
          </div>
          <Box sx={{ ml: 4 }}>
            <h2>{playlist?.name}</h2>
            <p>{playlist?.description}</p>
            <div className="playlist-description">
              <p>{!playlist?.publicAccessible ? "Private" : "Public"}</p>
              <p>{playlist?.tracks?.length} songs</p>
            </div>
          </Box>
        </div>
        <div>
          <EditPlaylistModal playlist={playlist} />
        </div>
        <div>
          <Typography sx={{ color: "#f3f3f3" }}>Suggestions</Typography>
          {/* {tracks} */}
          {data.songs.map((song, i) => (
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
      </div>
    </>
  );
}

export default PlaylistViewSongs;
