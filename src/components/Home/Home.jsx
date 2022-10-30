import React, { useEffect,useState }from "react";
import { useMediaQuery } from "react-responsive";
import MyPlaylists from "../MyPlaylists/MyPlaylists";
import ResponsiveAppBar from "../AppBar/AppBar";
import SideMenu from "../SideMenu/SideMenu";
import Top from "../Top/Top";
import MaterialPlayer from "../MaterialPlayer/MaterialPlayer";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import AlbumCarrousel from "../Albums/AlbumCarrousel";
import MobileTop from "../MobileTop/MobileTop";
import HomeHeader from "./HomeHeader/HomeHeader"

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

  const [data, setData] = useState([]);
   const token = localStorage.getItem("userToken");

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
 


}

  useEffect(() => {
    fetchData()
   }, [])

   const[random, setRandom] = useState([]);
   const fetchRandom = async () =>{
    const res = await fetch(
      "https://melodystream.herokuapp.com/playlist/random/music",
      {
        headers: {
          auth_token: token,
        },
      }
    );
    const random = await res.json();
    setRandom(random)
    }

   useEffect(()=>{
    fetchRandom()},[]);
   

  return (
    <>
      {isDesktop && (
        <>
         
          <HomeHeader />
          {<SideMenu />}
        <AlbumCarrousel data={data.data} random={random.data}/>
          <Top />
          <MaterialPlayer />         
          <SideMenu />
         
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
