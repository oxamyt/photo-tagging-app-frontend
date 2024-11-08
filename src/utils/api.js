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

export async function postStopTimerRequest() {
  try {
    const response = await fetch(`${API_URL}/timer/end`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response.json());
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
      console.log(response.json());
      let errorMessage = "Failed to record timer";

      throw new Error(errorMessage);
    }

    const userInfo = await response.json();
    console.log(userInfo);
    return userInfo;
  } catch (err) {
    console.error(err);
  }
}
