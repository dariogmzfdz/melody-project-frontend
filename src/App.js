import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AdminView from "./components/Account/AdminView/AdminView";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
