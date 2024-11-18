import { postStopTimerRequest } from "./api";

const checkWin = async (
  updatedCharacters,
  setGameOver,
  setGameState,
  time,
  setTime
) => {
  const allFound = updatedCharacters.every((character) => character.found);

  if (allFound) {
    setGameOver(true);
    const stopTime = time;
    const response = await postStopTimerRequest(stopTime);
    setTime(stopTime);
    setGameState((prevState) => ({
      ...prevState,
      totalTime: response.elapsedTime,
    }));
  }
};

export default checkWin;
