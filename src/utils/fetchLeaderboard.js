import { postLeaderboard } from "./api";

async function fetchLeaderboard(
  imageId,
  setLoading,
  setLeaderboardData,
  setError
) {
  setLoading(true);
  try {
    const response = await postLeaderboard(imageId);
    setLeaderboardData(response);
    setLoading(false);
  } catch (err) {
    setError(err);
    setLoading(false);
  }
}

export default fetchLeaderboard;
