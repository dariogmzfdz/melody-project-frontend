import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useGetPlaylistQuery } from "../../redux/services/melodyApi";
import CreatePlaylistModal from "./CreatePlaylist/CreatePlaylistModal";
import { useNavigate } from "react-router-dom";

function Playlists() {
  const { data, isFetching, error } = useGetPlaylistQuery();
  const navigate = useNavigate();
  const playlists = data?.data;
  const token = localStorage.getItem("userToken");

  function getId(id) {
    const playlistId = id;

    const fetchPlaylist = async (id) =>
      await fetch(`https://melodystream.herokuapp.com/playlist/${playlistId}`, {
        method: "GET",
        headers: { auth_token: token },
        id: playlistId,
      });
    fetchPlaylist();
    navigate(`/playlist/${playlistId}`);
  }
  if (isFetching) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  return (
    <div className="flex flex-col ml-80 font-mons text-white h-full">
      <header className="flex h-44 mb-1">
        <section className="flex flex-col justify-center grow ml-5">
          <h1 className=" not-italic text-6xl font-black whitespace-nowrap text-ellipsis leading-80">
            Your Playlists
          </h1>
          <div>{playlists.length} Playlists</div>
        </section>
      </header>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
          <div className="relative w-full h-56 group">
            <PlaylistAddIcon sx={{ fontSize: "230px", marginTop: "-8%" }} />
          </div>

          <div className="mt-4 flex flex-col">
            <CreatePlaylistModal />
          </div>
        </div>
        {playlists.map((playlist) => (
          <>
            <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
              <div className="relative w-full h-56 group">
                <img
                  alt="song_img"
                  src={playlist.thumbnail}
                  className="w-full h-full rounded-lg"
                  onClick={() => getId(playlist._id)}
                />
              </div>

              <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                  {playlist.name}
                </p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Playlists;
