import React from "react";
import "./MobileTop.css";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PlayArrow from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function MobileTop() {
  const isHome = window.location.pathname === "/home";
  const isFavorites = window.location.pathname === "/favorites";

  return (
    <>
      <div className="top-bg"></div>
      <div className="top-info">
        {isHome && (
          <h1>
            Hello User!
            <EmojiPeopleIcon />
          </h1>
        )}
        {isFavorites && (
          <div className="top-favorites">
            <h1>Favorites</h1>
            <button className="favorites-btn">
              <PlayArrow />
            </button>
            <button className="favorites-btn">
              <ShuffleIcon />
            </button>
            <button className="favorites-btn">
              <MoreHorizIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MobileTop;
