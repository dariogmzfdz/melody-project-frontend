import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SideMenu from "../SideMenu/SideMenu";
import Top from "../Top/Top";
import AlbumCarrousel from "../Albums/AlbumCarrousel";
import MobileTop from "../MobileTop/MobileTop";
import HomeHeader from "./HomeHeader/HomeHeader";

function Home() {
  const token = localStorage.getItem("userToken");

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 450px)",
  });

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(
      "https://melodystream.herokuapp.com/playlist/user/playlist",
      {
        headers: {
          auth_token: token,
        },
      }
    );
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [random, setRandom] = useState([]);
  const fetchRandom = async () => {
    const res = await fetch(
      "https://melodystream.herokuapp.com/playlist/random/music",
      {
        headers: {
          auth_token: token,
        },
      }
    );
    const random = await res.json();
    setRandom(random);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  const [likedSongs, setLikedSongs] = useState([]);
  const favorites = async () => {
    const response = await fetch(
      "https://melodystream.herokuapp.com/song/like",
      {
        headers: {
          auth_token: token,
        },
      }
    );
    const liked = await response.json();

    setLikedSongs(liked);
  };

  useEffect(() => {
    favorites();
  }, []);

  return (
    <>
      {isDesktop && (
        <>
          <HomeHeader />
          {<SideMenu />}
          <AlbumCarrousel data={data.data} random={random.data} />
          <Top favorites={likedSongs.songs} />
          <SideMenu />
        </>
      )}
      {isPhone && (
        <>
          <MobileTop />
          <AlbumCarrousel />
          <Top />
          <SideMenu />
        </>
      )}
    </>
  );
}

export default Home;
