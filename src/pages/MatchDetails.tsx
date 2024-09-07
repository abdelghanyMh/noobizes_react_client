import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GET_MATCH_DETAILS = gql`
  query GetMatchDetails($matchId: String!, $puuid: String!) {
    getMatchDetails(matchId: $matchId, puuid: $puuid) {
      duration
      gameMode
      gameStartTimestamp
      gameEndTimestamp
      championName
      role
      kills
      deaths
      assists
    }
  }
`;

const MatchDetails: React.FC = () => {
  const { matchId } = useParams();
  const puuid = sessionStorage.getItem("puuid");

  const { loading, error, data } = useQuery(GET_MATCH_DETAILS, {
    variables: { matchId, puuid },
    fetchPolicy: "cache-first",
  });

  if (data && data.getMatchDetails) {
    console.log(data.getMatchDetails);
  }

  return (
    <div className="flex space-x-4">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <CardTitle>Match Details</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {data && data.getMatchDetails && (
            <div className="mt-4 space-y-2">
              <p className="text-center font-bold">
                Champion: {data.getMatchDetails.championName}
              </p>
              <p className="text-center">
                Game Mode: {data.getMatchDetails.gameMode}
              </p>
              <p className="text-center">
                Duration:{" "}
                {data.getMatchDetails.duration
                  ? `${data.getMatchDetails.duration} minutes`
                  : "N/A"}
              </p>
              <p className="text-center">Role: {data.getMatchDetails.role}</p>
              <p className="text-center">Kills: {data.getMatchDetails.kills}</p>
              <p className="text-center">
                Deaths: {data.getMatchDetails.deaths}
              </p>
              <p className="text-center">
                Assists: {data.getMatchDetails.assists}
              </p>
              <p className="text-center">
                Game Start:{" "}
                {new Date(
                  data.getMatchDetails.gameStartTimestamp
                ).toLocaleString()}
              </p>
              <p className="text-center">
                Game End:{" "}
                {new Date(
                  data.getMatchDetails.gameEndTimestamp
                ).toLocaleString()}
              </p>

              {/* Display additional information or styling if needed */}
              <h2 className="text-lg font-semibold mt-4">Additional Details</h2>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchDetails;
