import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const PlayerStats: React.FC = () => {
  const { gameName, tagLine } = useParams();
  console.log(gameName, tagLine);

  return (
    <div>
      <h1>PlayerStats</h1>
      {gameName && tagLine && (
        <PlayerDataCard gameName={gameName} tagLine={tagLine} />
      )}
    </div>
  );
};

export default PlayerStats;

const GET_PLAYER_DATA = gql`
  query GetPlayerData($gameName: String!, $tagLine: String!) {
    getPlayerData(gameName: $gameName, tagLine: $tagLine) {
      id
      gameName
      tagLine
      profileIcon
      summonerLevel
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
  console.log(gameName, tagLine,"wtf");

  const { loading, error, data } = useQuery(GET_PLAYER_DATA, {
    variables: { gameName, tagLine },
    fetchPolicy: "cache-first",
  });

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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
