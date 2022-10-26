import React from 'react'
import Player from 'react-material-music-player' // default export
import { Track, PlayerInterface } from 'react-material-music-player'
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from '@mui/material/styles';



const MusicPlayer = () => { 
  const Track = JSON.parse(localStorage.getItem('Track'));
  console.log(Track);
//  
  // PlayerInterface.play( Track[] ) // sets a new playlist and starts playing
  // PlayerInterface.playLater( Track[] ) // appends to end of playlist
  // PlayerInterface.playAfter( Track[] ) // insert after current track:
 
  const theme = createTheme({
    palette: {
        mode: "dark",
    },
});
  return (
      <ThemeProvider theme={theme}>
        <Player  />
      </ThemeProvider>
  )
}

export default MusicPlayer