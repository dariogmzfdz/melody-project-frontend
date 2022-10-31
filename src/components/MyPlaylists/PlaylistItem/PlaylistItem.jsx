import React from "react";
import CreatePlaylistModal from "../CreatePlaylist/CreatePlaylistModal";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";

function PlaylistItem() {
  return (
    <div className="playlist-container">
      <div className="playlist-thumbnail">
        <PlaylistPlayIcon sx={{ fontSize: "150px" }} />
      </div>
      <CreatePlaylistModal />
    </div>
  );
}

export default PlaylistItem;
