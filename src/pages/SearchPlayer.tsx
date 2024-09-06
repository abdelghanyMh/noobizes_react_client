import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const lolLogo =
  "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/9eb028de391e65072d06e77f06d0955f66b9fa2c-736x316.png?auto=format&fit=fill&q=80&w=300";

const SearchPlayer = () => {
  const [gameName, setGameName] = useState("");
  const [tagName, setTagName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameName && tagName) {
      navigate(`/player/${gameName}/${tagName}`);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="flex items-center justify-center w-full min-h-screen">
        <Card className="p-10 w-full max-w-2xl bg-gray-800 shadow-2xl rounded-lg">
          <div className="flex flex-col items-center mb-8">
            <img
              src={lolLogo}
              alt="League of Legends Logo"
              className="w-40 mb-6"
            />
            <h2 className="text-white text-4xl font-bold mb-2 text-center">
              Player Stats
            </h2>
            <p className="text-gray-400 text-md text-center">
              Enter your Game Name and Tagline
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Game Name"
              className="p-4 w-full text-white bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <Input
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Tagline"
              className="p-4 w-full text-white bg-gray-700 border-none rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <Button
              type="submit"
              variant="default"
              className="w-full py-4 bg-purple-600 text-white text-lg rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
            >
              Search Player
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SearchPlayer;
