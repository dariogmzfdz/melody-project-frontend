import React, { useState } from 'react'
import Player from 'react-material-music-player' // default export
import { Track, PlayerInterface } from 'react-material-music-player'
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from '@mui/material/styles';



const MusicPlayer = () => { 

const trackStorage = JSON.parse(localStorage.getItem('Track'));
const {songId,songUrl,songTitle,songArtist,songDuration,songGenre} = trackStorage[0]

//Constructor Function
function Song (id, title, artist, source) {
  this.id = id;
  this.title = title;
  this.source = source;
  this.artist = artist;
  
}

let track = new Song (songId,songTitle,songArtist,songUrl);
 console.log(track)

 

  PlayerInterface.play( Song[{track}] ) // sets a new playlist and starts playing
  // PlayerInterface.playLater( Track[] ) // appends to end of playlist
  // PlayerInterface.playAfter( Track[] ) // insert after current track:
 
  const theme = createTheme({
    palette: {
        mode: "dark",
    },
});
  return (
      <ThemeProvider theme={theme}>
        <Player   />
      </ThemeProvider>
  )
}

export default MusicPlayer