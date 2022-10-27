import React from "react";
import { useMediaQuery } from "react-responsive";
import MyPlaylists from "../MyPlaylists/MyPlaylists";
import ResponsiveAppBar from "../AppBar/AppBar";
import SideMenu from "../SideMenu/SideMenu";
import Top from "../Top/Top";
import MaterialPlayer from "../MaterialPlayer/MaterialPlayer";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import AlbumCarrousel from "../Albums/AlbumCarrousel";
import MobileTop from "../MobileTop/MobileTop";

function Home() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isLaptop = useMediaQuery({
    query: "(max-width: 1200px) and (min-width: 800px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 800px) and (min-width: 450px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 450px)",
  });

  return (
    <>
      {isDesktop && (
        <>
          {/* <ResponsiveAppBar /> */}
          {<SideMenu />}
          <HomeHeader />
          <AlbumCarrousel />
          <Top />
          <MaterialPlayer />
          {/* <Player /> */}
          <ResponsiveAppBar />
          <SideMenu />
          <MyPlaylists />
        </>
      )}
      {isPhone && (
        <>
          <MobileTop />
          <AlbumCarrousel />
          <Top />
          <SideMenu />
          <MusicPlayer />
        </>
      )}
    </>
  );
}

export default Home;
