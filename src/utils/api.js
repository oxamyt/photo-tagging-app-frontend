const API_URL = import.meta.env.VITE_API_URL;

export async function postCoordinatesRequest(coordinates, characterName) {
  const { x, y } = coordinates;
  const data = { x, y, character: characterName.toUpperCase() };
  const response = await fetch(`${API_URL}/game`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = "Failed to send coordinates";

    throw new Error(errorMessage);
  }

  return await response.json();
}
