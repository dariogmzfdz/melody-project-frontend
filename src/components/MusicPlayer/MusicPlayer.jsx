import React, { useRef, useState } from "react";
import {BsFillSkipStartCircleFill, BsFillPlayCircleFill, BsFillSkipEndCircleFill, BsFillPauseCircleFill, BsFillHeartFill, BsHeart} from 'react-icons/bs'
import './musicPlayer.scss';

const MusicPlayer = ({audioElem, isPlaying, setIsPlaying, songs, currentSong, setCurrentSong}) => {
    const clickRef = useRef();
    const PlayPause = () => {
        setIsPlaying(!isPlaying);
    }
    
    const [isFavourite, setIsFavourite ] = useState(false);
    
    const favourite = () => {
        setIsFavourite(!isFavourite);
    }
    const checkWidth = (e)=> {
        let width = clickRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width * 100;
        audioElem.current.currentTime = divprogress/100*currentSong.length;
    }

    const skipBack = () => 
    {
      const index = songs.findIndex(x=>x.title === currentSong)
      if (index = 0){
        setCurrentSong(songs[songs.length-1])
      }
      else
      {
        currentSong = songs[index - 1]
      }
    }
    // let minutes = Math.floor(audioElem.current.currentTime / 60);
    // let seconds = (audioElem.current.currentTime % 60).toFixed();


  return (
    <div className="player_container">
      <div className="title">
        <p>{currentSong.title}</p>
        {/* <p> {minutes} :  {seconds}</p> */}
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek_bar" style={{width: `${currentSong.progress+"%"}`}}></div>
        </div>
      </div>
      <div className="controlButtons">
      <div className="controls">
        <BsFillSkipStartCircleFill className="btn_action" onClick={skipBack} />
        {isPlaying ? <BsFillPauseCircleFill className="btn_action pp" onClick={PlayPause}/>
        :        <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
    
    }

        <BsFillSkipEndCircleFill className="btn_action" />
      </div>
      <div className="favouriteSong">
        {isFavourite ? <BsFillHeartFill className="heart_btn_action" onClick={favourite} /> : <BsHeart className="heart_btn_action" onClick={favourite} />}
      </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
