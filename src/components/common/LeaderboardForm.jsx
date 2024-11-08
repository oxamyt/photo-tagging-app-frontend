import { useState } from "react";
import { postRecordTimer } from "../../utils/api";

function LeaderboardForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { username };

    try {
      const responseData = await postRecordTimer(data);

      console.log(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="flex-col flex  w-fit fixed top-1/2 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-black bg-green-800 z-20"
      onSubmit={handleSubmit}
    >
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LeaderboardForm;
