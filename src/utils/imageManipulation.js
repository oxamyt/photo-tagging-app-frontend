import { calculateCoordinates, calculateMark } from "./calculateCoordinates";
import { postCoordinatesRequest } from "./api";
import checkWin from "./checkWin";

export const handleImageClick = (e, gameState, setGameState) => {
  if (!gameState.showTargetingBox) {
    const img = e.currentTarget;

    const { naturalX, naturalY, relativeX, relativeY } = calculateCoordinates(
      img,
      e
    );

    setGameState((prevState) => ({
      ...prevState,
      boxPosition: { x: relativeX, y: relativeY },
      coordinates: { x: naturalX, y: naturalY },
      showTargetingBox: true,
    }));
  } else {
    setGameState((prevState) => ({
      ...prevState,
      showTargetingBox: false,
    }));
  }
};

export const handleCharacterClick = async (
  characterName,
  setGameState,
  gameState,
  setCharacters,
  setGameOver,
  time
) => {
  setGameState((prevState) => ({
    ...prevState,
    showTargetingBox: false,
  }));

  try {
    const response = await postCoordinatesRequest(
      gameState.coordinates,
      characterName
    );

    if (response.success) {
      const img = document.querySelector(".game-image");

      const { displayedX, displayedY } = calculateMark(
        img,
        response.correctCoordinates.x,
        response.correctCoordinates.y
      );

      setGameState((prevState) => ({
        ...prevState,
        successMarkPosition: [
          ...prevState.successMarkPosition,
          { characterName, x: displayedX, y: displayedY },
        ],
        foundCharacter: characterName,
        showPopup: true,
      }));

      setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          showPopup: false,
          foundCharacter: null,
        }));
      }, 2000);

      setCharacters((prevCharacters) => {
        const updatedCharacters = prevCharacters.map((char) =>
          char.name === characterName ? { ...char, found: true } : char
        );
        checkWin(updatedCharacters, setGameOver, setGameState, time);
        return updatedCharacters;
      });
    } else {
      setGameState((prevState) => ({
        ...prevState,
        foundCharacter: null,
        showPopup: true,
      }));

      setTimeout(() => {
        setGameState((prevState) => ({
          ...prevState,
          showPopup: false,
        }));
      }, 2000);
    }
  } catch (err) {
    console.error(err);
  }
};
