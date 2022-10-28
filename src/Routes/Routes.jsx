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
<<<<<<< Updated upstream
import CreateSong from "../components/CreateSong/SongTable";
=======
>>>>>>> Stashed changes
import Favorites from "../components/Favorites/Favorites";
import Search from "../components/SearchBar/SearchBar";
import Playlists from "../components/MyPlaylists/Playlists";

export default function RouterApp() {
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
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/edit" element={<EditUser />} />
            <Route path="/search" element={<Search />} />
<<<<<<< Updated upstream
            <Route path="/playlistmodel" element={<PlaylistModel />} />
            <Route path="/song" element={<CreateSong />} />
=======
            <Route path="/playlists" element={<Playlists />} />
>>>>>>> Stashed changes
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
