import { postStopTimerRequest } from "./api";

const checkWin = async (updatedCharacters, setGameOver, setGameState, time) => {
  const allFound = updatedCharacters.every((character) => character.found);

  if (allFound) {
    setGameOver(true);
    const response = await postStopTimerRequest(time);

    setGameState((prevState) => ({
      ...prevState,
      totalTime: response.elapsedTime,
    }));
  }
};

export default checkWin;
