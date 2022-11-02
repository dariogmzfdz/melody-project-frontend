import React from "react";
import {  useSelector } from "react-redux";
import { useState} from "react";
import { useMediaQuery } from "react-responsive";
import HeartButton from "@mui/icons-material/Favorite";
import "./Favorites.css";
import convertDurationPlaylist from "../../functions/ConvertDurationPlaylist";
import convertDuration from "../../functions/ConvertDuration";
import MobileHeader from "../MobileHeader/MobileHeader";

import { IconButton } from "@mui/material";
import { Clear, SearchRounded } from "@mui/icons-material";
import SongCard from "../SongCard/SongCard";
import { useGetLikedSongsQuery } from "../../redux/services/melodyApi";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

function Favorites() {
  const { data, isFetching, error } = useGetLikedSongsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  

  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isPhone = useMediaQuery({
    query: "(max-width: 450px)",
  });

  const songHandler = (
    songId,
    songUrl,
    songTitle,
    songArtist,
    songDuration,
    songGenre
  ) => {
    //  new Track = (songUrl,songTitle,songArtist,songDuration,songGenre)
    const Track = [
      { songId, songUrl, songTitle, songArtist, songDuration, songGenre },
    ];
    localStorage.setItem("Track", JSON.stringify(Track));
    console.log(Track);
  };

  //---- SEARCH BAR ---> START

  const [track, setTrack] = useState();
  const [inputTrack, setInputTrack] = useState("");
  // const {songTitle} = searchTrack

  function getTrack() {
    // Find track information in data using track
    let music = Object.values(data).find((song) => {
      return song.title.toLowerCase().includes(inputTrack.toLowerCase());
    });
    setTrack(music);
    // display the track
  }

  const handleSearch = (event) => {
    setInputTrack(event.target.value);
  };

  //Create function to clear state search
  function handleSearchClear(e) {
    setInputTrack("");
  }

  //---- SEARCH BAR  ---> END

  // const putLikedSong = async (favorite) => {

  // try {
  //   const data = await axios.put(
  //     `https://melodystream.herokuapp.com/song/like/${favorite}`,

  //     {
  //       headers: {
  //         auth_token: token,
  //       }
  //     }
  //     )
  //        const response = await data.json();

  //     }
  //     catch (data) {
  //       const { msg } = data.response.data;
  //       console.log(msg);

  //     }    }
  /* const putLikedSong = {
    method: "PUT",
    headers: { auth_token: token },
  };
  const fetchLikedSong = async () =>
    await fetch(
      `https://cors-anywhere.herokuapp.com/https://melodystream.herokuapp.com/song/like/${favorite}`,
      putLikedSong
    );

  const changeFavorite = (id) => {
    setFavorite([id]);
    data.songs.map((song) => {
      const { _id } = song;
      if (_id === id) {
        song.favorite = !song.favorite;
      }
    });
    console.log(favorite);
    // putLikedSong(favorite);
    fetchLikedSong();
  }; */

  if (isFetching) return <Loader title="Loading Top Charts" />;

  if (error) return <Error />;

  const totalDuration = data.songs.map((song) => song.duration);

  return (
    <>
      {isDesktop && (
        <>
          <div className="container-right">
            <header>
              <section className="info">
                <h6>Your songs</h6>
                <h1>Favorites</h1>
                <div className="details">
                  <p>{data.songs.length} Songs</p>
                  <p id="dot">&bull;</p>
                  <p>{convertDurationPlaylist(totalDuration)}</p>
                </div>
              </section>
              <div className="container">
                <div className="search_input_container">
                  <IconButton onClick={getTrack}>
                    <SearchRounded />
                  </IconButton>
                  <input
                    type="text"
                    placeholder="Search for songs and playlists"
                    name="songTitle"
                    onChange={handleSearch}
                    value={inputTrack}
                  />
                  <IconButton onClick={handleSearchClear}>
                    <Clear />
                  </IconButton>
                </div>
              </div>
            </header>
            <table className="favorites-table animate-slideup">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Genre</th>
                  <th id="duration-header">Duration</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.songs.map((song, i) => (
                  <SongCard
                    key={song._id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={i}
                    convertDuration={convertDuration}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {isPhone && (
        <>
          <MobileHeader />
          {data.map((song) => (
            <div key={song._id} className="container-song-favorites">
              <div className="cover-container">
                <img
                  src="	https://mussica.info/wp-content/uploads/2021/08/nirvana-640-logo-1200x675-cover.jpeg"
                  alt="song-img"
                />
              </div>
              <div className="info-container">
                <span>{song.title}</span>
                <div className="contributors">
                  <p className="track-artist">{song.artist}</p>
                </div>
              </div>
              <div className="song-details">
                <p className="duration">{convertDuration(song.duration)}</p>
                <HeartButton />
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Favorites;
