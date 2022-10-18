import React, { useRef } from "react";
import {BsFillSkipStartCircleFill, BsFillPlayCircleFill, BsFillSkipEndCircleFill, BsFillPauseCircleFill} from 'react-icons/bs'
import './musicPlayer.scss';

const MusicPlayer = ({audioElem, isPlaying, setIsPlaying, currentSong}) => {
    const clickRef = useRef();
    const PlayPause = () => {
        setIsPlaying(!isPlaying);
    }
    const checkWidth = (e)=> {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress/100*currentSong.length;
    }

  return (
    <div className="player_container">
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek_bar" style={{width: `${currentSong.progress+"%"}`}}></div>
        </div>
      </div>
      <div className="controls">
        <BsFillSkipStartCircleFill className="btn_action" />
        {isPlaying ? <BsFillPauseCircleFill className="btn_action pp" onClick={PlayPause}/>
        :        <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
    
    }

        <BsFillSkipEndCircleFill className="btn_action" />
      </div>
    </div>
  );
};

export default MusicPlayer;
