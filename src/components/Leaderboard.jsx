import { useEffect, useState } from "react";
import { getLeaderboard } from "../utils/api";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard();
        setLeaderboardData(response);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="w-full bg-[#f0f4f8] min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Leaderboard</h1>

      {loading && <p className="text-lg text-gray-600">Loading...</p>}

      {error && <p className="text-lg text-red-600">{error}</p>}

      {leaderboardData && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-gray-100 text-sm text-gray-700 font-semibold">
            <span className="flex-1">Player</span>
            <span className="text-right">Time</span>
          </div>
          <ul className="divide-y divide-gray-200">
            {leaderboardData.map((player) => (
              <li
                key={player.id}
                className="flex justify-between items-center p-4 hover:bg-gray-50"
              >
                <span className="flex-1 text-gray-900">{player.user}</span>
                <span className="text-gray-600">{player.time}s</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
