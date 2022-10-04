import './App.css';
import Features from './components/Features/Features';
import MyPlaylists from './components/MyPlaylists/MyPlaylists';
import Recommended from './components/Recommended/Recommended';
import SearchBar from './components/SearchBar/SearchBar';
import Settings from './components/Settings/Settings';
import SideMenu from './components/SideMenu/SideMenu';
import Top from './components/Top/Top';


function App() {
  return (
    <div className="App">
      <SideMenu />
      <SearchBar />
      <MyPlaylists />
      <Settings />
      <Features />
      <Recommended />
      <Top />
    </div>
  );
}

export default App;
