
import { Favorite } from "@mui/icons-material";
import React from "react";

function LikedSongs({ song }) {
  const token = localStorage.getItem("userToken");


  // console.log("songs", likedSongs)
  // console.log("id", likedSongs._id)

  function changeFavorite(id) {
    const likedId = id;
    console.log(likedId);
    
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
    window.location.reload()
  }


  return <td onClick={()=>changeFavorite(song._id)}><Favorite/></td>;
}

export default LikedSongs;
