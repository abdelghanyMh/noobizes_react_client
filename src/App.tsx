import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MatchDetails from "./pages/MatchDetails";
import PlayerStats from "./pages/PlayerStats";
import SearchPlayer from "./pages/SearchPlayer";
// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPlayer />} />
          <Route path="/player/:gameName/:tagLine" element={<PlayerStats />} />
          <Route path="/match/:matchId" element={<MatchDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
