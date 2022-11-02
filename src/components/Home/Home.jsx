import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import SideMenu from "../SideMenu/SideMenu";
import Top from "../Top/Top";
import AlbumCarrousel from "../Albums/AlbumCarrousel";
import MobileHeader from "../MobileHeader/MobileHeader";
import HomeHeader from "./HomeHeader/HomeHeader";
import { useGetPlaylistQuery } from "../../redux/services/melodyApi";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

function Home() {
  const { data, isFetching, error } = useGetPlaylistQuery();
  const token = localStorage.getItem("userToken");

  console.log(data);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 450px)",
  });

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

  console.log(random);

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  return (
    <>
      {isDesktop && (
        <>
          <HomeHeader />
          <AlbumCarrousel data={data.data} random={random.data} />
          <Top />
        </>
      )}
      {isPhone && (
        <>
          <MobileHeader />
          <AlbumCarrousel data={data.data} random={random.data} />
          <Top />
        </>
      )}
    </>
  );
}

export default Home;
