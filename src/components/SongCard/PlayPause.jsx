import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import styled from "styled-components";

const ButtonPlay = styled.div`
  cursor: pointer;
`;

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <ButtonPlay>
      <FaPauseCircle
        size={35}
        className="text-gray-300 hover:text-gray-600"
        onClick={handlePause}
      />
    </ButtonPlay>
  ) : (
    <ButtonPlay>
      <FaPlayCircle
        size={35}
        className="text-gray-300 hover:text-gray-600"
        onClick={handlePlay}
      />
    </ButtonPlay>
  );

export default PlayPause;
