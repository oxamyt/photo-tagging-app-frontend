import { useState } from "react";
import { postRecordTimer } from "../../utils/api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LeaderboardForm({ totalTime }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { username };

    try {
      const responseData = await postRecordTimer(data);
      console.log(responseData);

      navigate("/leaderboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl shadow-lg bg-green-800 text-white z-20 space-y-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl font-semibold text-center">
        Your total time is {totalTime} seconds. Enter your username to submit
        your result.
      </h1>
      <label className="w-full text-lg">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 w-full p-2 border-2 border-gray-300 rounded-md text-black"
          required
        />
      </label>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold mt-4"
      >
        Submit
      </button>
    </form>
  );
}

LeaderboardForm.propTypes = {
  totalTime: PropTypes.number,
};

export default LeaderboardForm;
