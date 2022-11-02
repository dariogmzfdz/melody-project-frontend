import * as React from "react";

import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import SongImg from "../../../assets/album-img.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import { useEffect } from "react";

function SuggestSong({
  song,
  lastPlaylist,
  userPlaylists,
  isPlaying,
  activeSong,
  data,
  i,
  convertDuration,
  playlistId,
}) {
  const token = localStorage.getItem("userToken") || null;

  const [serverMsg, setServerMsg] = React.useState("");
  const [isSongAdd, setIsSongAdd] = React.useState(false);

  const [ErrorMsg, setErrorMsg] = React.useState("");
  const [serverError, setSeverError] = React.useState(false);

  const [open, setOpen] = React.useState(true);
  const [openError, setOpenError] = React.useState(true);

  const [trackDetails, setTrackDetails] = React.useState();
  const [track, setTrack] = React.useState([
    {
      title: "",
      artist: "",
      duration: "",
      ur: "",
    },
  ]);
  const [isTrackDefined, setIsTrackDefined] = React.useState();

  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  //? Popover button add song to any playlist
  // const showUserPlaylists = userPlaylists.map((playlist) => {
  //   return (
  //     <div key={playlist?._id}>
  //       <Typography sx={{ p: 2 }}>{playlist?.name}</Typography>
  //     </div>
  //   );
  // });

  const addSuggestSong = async (e, songId) => {
    e.preventDefault();
    const playlistId = lastPlaylist?._id;
    const songsId = songId;

    const options = {
      url: `http://localhost:4000/playlist/add-song/${playlistId}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        auth_token: token,
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        song_id: songsId,
      },
    };

    try {
      const result = await axios(options);
      console.log(result);
      setServerMsg(result.data.msg);
      setIsSongAdd(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
        setErrorMsg(error.response.data.msg);
        setSeverError(true);
      }
    }
  };
  useEffect(() => {
    const songId = lastPlaylist._id;
    function Music(title, artist, duration, url) {
      this.title = title;
      this.artist = artist;
      this.duration = duration;
      this.url = url;
    }

    const getPlaylistById = async (songId) => {
      const response = await fetch(
        //https://melodystream.herokuapp.com/playlist/${playlistID}
        `http://localhost:4000/playlist/${songId}`,
        {
          headers: {
            auth_token: token,
          },
        }
      );

      try {
        const data = await response.json();
        console.log(data);
        setTrackDetails(data);
        const { songs } = trackDetails;
        for (let music of songs) {
          let Track = new Music(
            music.title,
            music.artist,
            music.duration,
            music.url
          );
          console.log(Track);
          // console.log(Track.title);
          //   this.setTrack(prevState => ({
          //     itemList: prevState.itemList.map(
          //     obj => (obj._id === 1234 ? Object.assign(obj, { description: "New Description" }) : obj)
          //   )
          // }));
          setIsTrackDefined(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlaylistById(songId);
  }, []);

  // Track.map((music) => {
  //   setTrack((prevMusic) => {
  //     return {
  //       ...prevMusic,
  //       title: music.title,
  //       artist: music.artist,
  //       duration: music.duration,
  //       url: music.url,
  //     };
  //   });
  // });
  console.log(track);

  return (
    <>
      <div className="container-song added">
        <div className="cover-container">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            className="playpause"
          />
        </div>
        <div className="info-container">
          <span>{track.title}</span>
          <div className="contributors">
            <p className="track-artist">{track.artist}</p>
          </div>
        </div>
        <button>
          <FavoriteIcon className="favoriteIcon" />
        </button>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography sx={{ p: 1 }}>
              {convertDuration(track.duration)}
            </Typography>
          </div>
        </Box>
      </div>
      {/* <div className="container-song suggestions">
        <div className="cover-container">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            className="playpause"
          />
        </div>
        <div className="info-container">
          <span>{song.title}</span>
          <div className="contributors">
            <p className="track-artist">{song.artist}</p>
          </div>
        </div>
        <div>
          {isSongAdd && (
            <Box sx={{ width: "100%" }}>
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {serverMsg}
                </Alert>
              </Collapse>
            </Box>
          )}
        </div>
        {serverError && (
          <Box sx={{ width: "100%" }}>
            <Collapse in={openError}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="warning"
                sx={{ mb: 2 }}
              >
                {ErrorMsg}
              </Alert>
            </Collapse>
          </Box>
        )}
        <button>
          <FavoriteIcon className="favoriteIcon" />
        </button>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography sx={{ p: 1 }}>
              {convertDuration(song.duration)}
            </Typography>
          </div>
          <div>
            <button
              onClick={(e) => {
                addSuggestSong(e, song._id);
                // getPlaylistById();
              }}
            >
              <PlaylistAddIcon onClick={() => setOpenError(true)} />
            </button>
          </div>
        </Box>
      </div> */}
    </>
  );
}

export default SuggestSong;
