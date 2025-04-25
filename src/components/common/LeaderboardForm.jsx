import { useState } from "react";
import { postRecordTimer } from "../../utils/api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function LeaderboardForm({ totalTime, imageId, id }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { username, imageId, id };

    try {
      await postRecordTimer(data);

      navigate("/leaderboard");
    } catch (err) {
      console.error(err);
    }
  };
  const formattedTime = (totalTime / 1000).toFixed(3);
  return (
    <form
      className="flex flex-col transition duration-300 z-100 items-center w-full max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl shadow-lg bg-lightBg text-black dark:bg-darkBg dark:text-white z-20 space-y-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-semibold text-center">
        Your total time is {formattedTime} seconds. Enter your username to
        submit your result.
      </h1>
      <label className="w-full text-lg">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md text-black "
          required
        />
      </label>
      <button
        type="submit"
        className="w-full p-2 bg-darkBg text-white dark:bg-lightBg dark:text-black rounded-lg font-semibold mt-4"
      >
        Submit
      </button>
    </form>
  );
}

LeaderboardForm.propTypes = {
  totalTime: PropTypes.number,
  imageId: PropTypes.number,
  id: PropTypes.string,
};

export default LeaderboardForm;
