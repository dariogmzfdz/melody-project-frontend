import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AlbumImg from "../../assets/album-img.jpg";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../../redux/features/playerSlice";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const SongCard = ({
  song,
  isPlaying,
  activeSong,
  data,
  i,
  changeFavorite,
  convertDuration,
}) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

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
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      </td>
      <td onClick={() => changeFavorite(song._id)}>
        {song?.favorite ? (
          <i>
            <FaHeart />
          </i>
        ) : (
          <i>
            <FaRegHeart />
          </i>
        )}
      </td>
    </tr>
  );
};

export default SongCard;
