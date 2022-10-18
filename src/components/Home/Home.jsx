import React from "react";
import Features from "../Features/Features";
import MyPlaylists from "../MyPlaylists/MyPlaylists";
import Recommended from "../Recommended/Recommended";
import SearchBar from "../SearchBar/SearchBar";
import ResponsiveAppBar from "../AppBar/AppBar";
import SideMenu from "../SideMenu/SideMenu";
import Top from "../Top/Top";
import Player from "../MusicPlayer/Player";

function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <SideMenu />
      <MyPlaylists />
      <Features />
      <Recommended />
      <Top />
      <Player />
    </>
  );
}

export default Home;
