import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const PlayerStats: React.FC = () => {
  const { gameName, tagLine } = useParams();
  console.log(gameName, tagLine);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Player Stats</h1>
      {gameName && tagLine && (
        <PlayerDataCard gameName={gameName} tagLine={tagLine} />
      )}
    </div>
  );
};

export default PlayerStats;

// GraphQL query including matches
const GET_PLAYER_DATA = gql`
  query GetPlayerData($gameName: String!, $tagLine: String!) {
    getPlayerData(gameName: $gameName, tagLine: $tagLine) {
      id
      gameName
      tagLine
      profileIcon
      summonerLevel
      matches
      puuid
    }
  }
`;

const PlayerDataCard = ({
  gameName,
  tagLine,
}: {
  gameName: string;
  tagLine: string;
}) => {
  const { loading, error, data } = useQuery(GET_PLAYER_DATA, {
    variables: { gameName, tagLine },
    fetchPolicy: "cache-first",
  });
  // when laoding if false save puuid in session storage
  if (!loading && data && data.getPlayerData) {
    sessionStorage.setItem("puuid", data.getPlayerData.puuid);
  }

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Player Data</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {data && data.getPlayerData && (
            <div className="mt-4 space-y-2">
              <img
                src={data.getPlayerData.profileIcon}
                alt="Profile Icon"
                className="w-16 h-16 mx-auto rounded-full"
              />
              <p className="text-center font-bold">
                {data.getPlayerData.gameName}#{data.getPlayerData.tagLine}
              </p>
              <p className="text-center">
                Level: {data.getPlayerData.summonerLevel}
              </p>
              <p className="text-center text-sm text-gray-500">
                ID: {data.getPlayerData.id}
              </p>

              {/* Display Matches List */}
              <h2 className="text-lg font-semibold mt-4">Recent Matches</h2>
              <ul className="list-disc list-inside space-y-2">
                {data.getPlayerData.matches.map((matchId: string) => (
                  <li
                    key={matchId}
                    className="flex justify-between items-center"
                  >
                    <span>{matchId}</span>
                    <Link to={`/match/${matchId}`}>
                      <Button variant="secondary" className="ml-4">
                        View Match
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
