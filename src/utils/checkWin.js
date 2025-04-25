import { postStopTimerRequest } from "./api";

const checkWin = async (
  updatedCharacters,
  setGameOver,
  setGameState,
  setTime,
  id
) => {
  const allFound = updatedCharacters.every((character) => character.found);

  if (allFound) {
    setGameOver(true);
    const { elapsedTime } = await postStopTimerRequest(id);
    setTime(elapsedTime);
    setGameState((prevState) => ({
      ...prevState,
      totalTime: elapsedTime,
    }));
  }
};

export default checkWin;
