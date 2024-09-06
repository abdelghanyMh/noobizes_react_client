import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPlayer from "./pages/SearchPlayer";
import PlayerStats from "./pages/PlayerStats";
import MatchDetails from "./pages/MatchDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPlayer />} />
        <Route path="/player/:gameName/:tagName" element={<PlayerStats />} />
        <Route path="/match/:matchId" element={<MatchDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
