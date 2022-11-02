import React from "react";
import "./MobileHeader.css";
import PlayArrow from "@mui/icons-material/PlayArrow";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function MobileHeader() {
  const isHome = window.location.pathname === "/home";
  const isFavorites = window.location.pathname === "/favorites";

  return (
    <>
      <div className="top-bg"></div>
      <div className="flex items-center h-16 top-info ml-[5%] mb-[15%] z-[1]">
        {isHome && (
          <>
            <h1 className="bg-mbl bg-clip-text text-transparent text-5xl">
              <strong>Hello</strong> User!
            </h1>
          </>
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

export default MobileHeader;
