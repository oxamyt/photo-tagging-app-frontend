import { useEffect, useState } from "react";
import { getImages } from "../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import fetchLeaderboard from "../utils/fetchLeaderboard";
import Images from "./common/Images";
import LeaderboardData from "./common/LeaderboardData";

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

      {leaderboardData && <LeaderboardData leaderboardData={leaderboardData} />}
    </div>
  );
}

export default Leaderboard;
