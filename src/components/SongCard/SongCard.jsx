import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AlbumImg from "../../assets/album-img.jpg";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import LikedSongs from "../LikedSongs/LikedSongs";
const SongCard = ({
  song,
  isPlaying,
  activeSong,
  data,
  i,
  convertDuration,
}) => {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState([]);

  // const token = localStorage.getItem("userToken");

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // const putLikedSong = {
  //   method: "PUT",
  //   headers: { auth_token: token },
  // };
  // const fetchLikedSong = async () =>
  //   await fetch(
  //     `https://cors-anywhere.herokuapp.com/https://melodystream.herokuapp.com/song/like/${favorite}`,
  //     putLikedSong
  //   );

  // const changeFavorite = (id) => {
  //   setFavorite([id]);
  //   data.songs.forEach((song) => {
  //     const { _id } = song;
  //     if (_id === id) {
  //       song.favorite = !song.favorite;
  //     }
  //   });
  //   console.log(favorite);
  //   // putLikedSong(favorite);
  //   fetchLikedSong();
  // };

  return (
    <tr key={song._id}>
      <td>{i + 1}</td>
      <td>
        <p>{song.title}</p>
      </td>
      <td>
        <p>{song.artist}</p>
      </td>
      <td>
        <p>{song.genre}</p>
      </td>
      <td className="duration-field">{convertDuration(song.duration)}</td>
      <td>
        <PlayPause
        className="play"
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </td>
      <td>
        <LikedSongs key={song._id} song={song} />
      </td>
    </tr>
  );
};

export default SongCard;
