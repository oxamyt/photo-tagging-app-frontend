const API_URL = import.meta.env.VITE_API_URL;

export async function postCoordinatesRequest(coordinates, characterName) {
  const { x, y } = coordinates;
  const data = { x, y, character: characterName.toUpperCase() };
  const response = await fetch(`${API_URL}/game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = "Failed to send coordinates";

    throw new Error(errorMessage);
  }

  return await response.json();
}

export async function postStartTimerRequest() {
  try {
    const response = await fetch(`${API_URL}/timer/start`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      let errorMessage = "Failed to start timer";

      throw new Error(errorMessage);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function postStopTimerRequest(clientEndTime) {
  try {
    const data = { clientEndTime };
    const response = await fetch(`${API_URL}/timer/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = "Failed to stop timer";

      throw new Error(errorMessage);
    }

    const time = await response.json();

    return time;
  } catch (err) {
    console.error(err);
  }
}

export async function postRecordTimer(data) {
  try {
    const response = await fetch(`${API_URL}/timer/record`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = "Failed to record timer";

      throw new Error(errorMessage);
    }

    const userInfo = await response.json();

    return userInfo;
  } catch (err) {
    console.error(err);
  }
}

export async function getLeaderboard() {
  try {
    const response = await fetch(`${API_URL}/leaderboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      let errorMessage = "Failed to fetch leaderboard";

      throw new Error(errorMessage);
    }

    const users = await response.json();
    return users;
  } catch (err) {
    console.error(err);
  }
}

export async function getGameData() {
  try {
    const response = await fetch(`${API_URL}/game-data`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      let errorMessage = "Failed to fetch game data";

      throw new Error(errorMessage);
    }

    const gameData = await response.json();

    return gameData;
  } catch (err) {
    console.error(err);
  }
}
