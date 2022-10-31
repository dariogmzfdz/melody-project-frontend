import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../hooks/useFirebase";
import SignInSide from "../components/Login/Login";
import Logout from "../components/Logout.jsx";
import ForgotPassword from "../components/Login/ForgotPassword.jsx";
import Signup from "../components/SignIn/SignIn.jsx";
import EditUser from "../components/EditUser/EditUser";
import Home from "../components/Home/Home";
import AdminView from "../components/Account/AdminView/AdminView";
import Profile from "../components/Profile/Profile";
import ResetPassword from "../components/ResetPassWord/ResetPassword";
import Favorites from "../components/Favorites/Favorites";
import Search from "../components/SearchBar/SearchBar";
import MusicPlayer from "../components/MusicPlayer/index";
import Songs from "../components/CreateSong/SongTable";
import Playlists from "../components/MyPlaylists/Playlists";
import PlaylistEdit from "../components/MyPlaylists/EditPlaylist/PlaylistEdit";

export default function RouterApp() {
  const { activeSong } = useSelector((state) => state.player);
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/edit" element={<EditUser />} />
            <Route path="/search" element={<Search />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/playlist-edit" element={<PlaylistEdit />} />
          </Routes>
        </AuthProvider>
      </Router>
      {activeSong?.title && (
        <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-white rounded-t-3xl z-50">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}
