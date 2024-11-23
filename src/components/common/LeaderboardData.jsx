import PropTypes from "prop-types";

function LeaderboardData({ leaderboardData }) {
  return (
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
              <span className="flex-1">{(player.time / 1000).toFixed(3)}s</span>
              <span>{new Date(player.createdAt).toLocaleDateString()}</span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

LeaderboardData.propTypes = {
  leaderboardData: PropTypes.array,
};

export default LeaderboardData;
