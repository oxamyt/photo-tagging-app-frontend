const API_URL = import.meta.env.VITE_API_URL;

export async function postCoordinatesRequest(coordinates, characterName) {
  const { x, y } = coordinates;
  const data = { x, y, character: characterName.toUpperCase() };
  const response = await fetch(`${API_URL}/game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
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
    return response.json();
  } catch (err) {
    console.error(err);
  }
}

export async function postStopTimerRequest(id) {
  try {
    const response = await fetch(`${API_URL}/timer/end`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
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
    const response = await fetch(`${API_URL}/leaderboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

export async function getImages() {
  try {
    const response = await fetch(`${API_URL}/leaderboard`, {
      method: "GET",
      credentials: "include",
    });

    const imagesData = await response.json();

    return imagesData;
  } catch (err) {
    console.error(err);
  }
}

export async function postLeaderboard(imageId) {
  try {
    const data = { imageId };
    const response = await fetch(`${API_URL}/leaderboard/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
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

export async function getGameData(pictureName) {
  try {
    const data = { pictureName };
    const response = await fetch(`${API_URL}/game-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
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
