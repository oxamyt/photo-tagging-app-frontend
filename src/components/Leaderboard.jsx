import { useEffect, useState } from "react";
import { getImages } from "../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import fetchLeaderboard from "../utils/fetchLeaderboard";
import Images from "./common/Images";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImages();

        setImages(response.Images);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchImages();
    fetchLeaderboard(1, setLoading, setLeaderboardData, setError);
  }, []);

  return (
    <div className=" bg-lightBg text-black dark:text-white dark:bg-darkBg min-h-screen flex flex-col  items-center transition duration-300 p-6">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
        Leaderboard
      </h1>

      {loading && (
        <div className="flex items-center justify-center w-full h-screen">
          <AiOutlineLoading3Quarters className="animate-spin h-12 w-12 text-gray-500" />
        </div>
      )}

      {error && <p className="text-lg text-red-600">{error}</p>}

      {images.length > 0 && (
        <Images
          images={images}
          fetchLeaderboard={fetchLeaderboard}
          setLoading={setLoading}
          setLeaderboardData={setLeaderboardData}
          setError={setError}
        />
      )}

      {leaderboardData && (
        <main className="w-full transition duration-300 max-w-4xl bg-lightBg text-black dark:text-white dark:bg-darkBg rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-4 text-black dark:text-white text-sm font-semibold">
            <span className="flex-1">Player</span>
            <span className="flex-1 pr-10">Time</span>
            <span className="pr-1">Date</span>
          </div>
          <ul className="divide-y divide-gray-200">
            {leaderboardData.map((player) => {
              return (
                <li
                  key={player.id}
                  className="flex justify-evenly items-center p-4 hover:text-yellow-500 hover:dark:text-yellow-400"
                >
                  <span className="flex-1">{player.user}</span>
                  <span className="flex-1">
                    {(player.time / 1000).toFixed(3)}s
                  </span>
                  <span>{new Date(player.createdAt).toLocaleDateString()}</span>
                </li>
              );
            })}
          </ul>
        </main>
      )}
    </div>
  );
}

export default Leaderboard;
