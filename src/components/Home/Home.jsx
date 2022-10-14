import React from "react";
import Features from "../Features/Features";
import MyPlaylists from "../MyPlaylists/MyPlaylists";
import Recommended from "../Recommended/Recommended";
import SearchBar from "../SearchBar/SearchBar";
import Settings from "../Settings/Settings";
import SideMenu from "../SideMenu/SideMenu";
import Top from "../Top/Top";

function Home() {
  return (
    <>
      <SideMenu />
      <SearchBar />
      <MyPlaylists />
      <Settings />
      <Features />
      <Recommended />
      <Top />
    </>
  );
}

export default Home;
