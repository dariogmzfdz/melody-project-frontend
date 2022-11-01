import { Identity } from "@mui/base";
import React from "react";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Favorites from "../Favorites/Favorites";
import SongCard from "../SongCard/SongCard";

function LikedSongs({ song }) {
  const token = localStorage.getItem("userToken");


  // console.log("songs", likedSongs)
  // console.log("id", likedSongs._id)

  function changeFavorite(id) {
    console.log(id);
    const likedId = id;

        // song.filter()

        // song.filter(song=> likedId !== song._id);
      
  const putLikedSong = {
    method: "PUT",
    headers: { auth_token: token },
  };
  const fetchLikedSong = async () =>
    await fetch(
        `http://melodystream.herokuapp.com/song/like/${likedId}`,
        putLikedSong
        );
 
    fetchLikedSong();
  }


  return <td onClick={()=>changeFavorite(song._id)}>like</td>;
}

export default LikedSongs;
