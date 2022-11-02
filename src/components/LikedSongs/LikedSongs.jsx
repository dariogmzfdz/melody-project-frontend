import { Favorite } from "@mui/icons-material";
import axios from "axios";
import React from "react";

function LikedSongs({ song }) {
  const token = localStorage.getItem("userToken");

  const favorite = async (id) => {
    console.log(id);
    try {
      const data = await axios.put(
        `https://melodystream.herokuapp.com/song/like/${id}`,

        {
          id: song._id,
        },
        {
          headers: {
            auth_token: token,
          },
        }
      );
      window.location.reload();
      const result = await data.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={() => favorite(song._id)}>
      <Favorite className="favoriteIcon" />
    </button>
  );
}

export default LikedSongs;
