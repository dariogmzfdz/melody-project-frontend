import * as React from "react";

import { useDispatch } from "react-redux";
import PlayPause from "../../SongCard/PlayPause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { playPause, setActiveSong } from "../../../redux/features/playerSlice";
import SongImg from "../../../assets/album-img.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

function Songs({
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

  // const [open, setOpen] = React.useState(true);
  // const [openError, setOpenError] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //? Popover button add song to any playlist
  // const showUserPlaylists = userPlaylists.map((playlist) => {
  //   return (
  //     <div key={playlist?._id}>
  //       <Typography sx={{ p: 2 }}>{playlist?.name}</Typography>
  //     </div>
  //   );
  // });

  return (
    <div className="container-song">
      <div className="cover-container">
      
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        className="playpause"
      /></div>
      <div className="info-container">
        <span>{song.title}</span>
        <div className="contributors">
          <p className="track-artist">{song.artist}</p>
        </div>
      </div>
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
          <Button
            aria-describedby={id}
            onClick={handleClick}
            style={{color:'#000'}}
          >
            <PlaylistAddIcon />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Insert playlist name</Typography>
          </Popover>
        </div>
      </Box>
    </div>
  );
}

export default Songs;
