import { useState, useEffect, useCallback } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import Dropdown from "./common/Dropdown";
import {
  postCoordinatesRequest,
  postStartTimerRequest,
  postStopTimerRequest,
  getGameData,
} from "../utils/api";
import { useOutletContext } from "react-router-dom";
import LeaderboardForm from "./common/LeaderboardForm";
import calculateCoordinates from "../utils/calculateCoordinates";

function PhotoDisplay() {
  const [gameState, setGameState] = useState({
    boxPosition: null,
    showTargetingBox: false,
    coordinates: null,
    successMarkPosition: [],
    showPopup: false,
    foundCharacter: null,
    totalTime: null,
    image: null,
  });

  const [
    characters,
    setCharacters,
    gameOver,
    setGameOver,
    time,
    setTime,
    setGameStarted,
  ] = useOutletContext();

  const fetchGameData = useCallback(async () => {
    try {
      const gameData = await getGameData();
      setCharacters(gameData.characters);
      setGameState((prev) => ({
        ...prev,
        image: gameData.image,
      }));

      if (!gameOver) {
        await postStartTimerRequest();
      }
      setGameStarted(true);
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  }, [gameOver, setCharacters, setGameStarted]);

  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]);

  const handleImageClick = (e) => {
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

  const handleCharacterClick = async (characterName) => {
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
        const img = document.querySelector("img");
        const imageRect = img.getBoundingClientRect();
        const scaleX = imageRect.width / img.naturalWidth;
        const scaleY = imageRect.height / img.naturalHeight;

        const displayedX = response.correctCoordinates.x * scaleX;
        const displayedY = response.correctCoordinates.y * scaleY;

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
          checkWin(updatedCharacters);
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

  const checkWin = async (updatedCharacters) => {
    const allFound = updatedCharacters.every((character) => character.found);

    if (allFound) {
      setGameOver(true);
      const response = await postStopTimerRequest();

      setGameState((prevState) => ({
        ...prevState,
        totalTime: response.elapsedTime,
      }));
    }
  };

  return (
    <div className="relative">
      {!gameState.image && (
        <div className="flex items-center justify-center w-full h-screen">
          <AiOutlineLoading3Quarters className="animate-spin h-12 w-12 text-gray-500" />
        </div>
      )}
      <img
        src={gameState.image}
        alt="game image"
        className="cursor-pointer z-10"
        onClick={handleImageClick}
      />
      {gameState.showTargetingBox && (
        <>
          <div
            className="absolute border-2 rounded-full bg-opacity-30 bg-stone-100 border-stone-100 border-dashed"
            style={{
              left: gameState.boxPosition.x - 50,
              top: gameState.boxPosition.y - 50,
              width: `100px`,
              height: `100px`,
            }}
          />
          <Dropdown
            handleCharacterClick={handleCharacterClick}
            boxPosition={gameState.boxPosition}
          />
        </>
      )}
      {gameState.successMarkPosition.map((mark, index) => (
        <div
          key={index}
          className="absolute bg-red-500 rounded-full"
          style={{
            left: mark.x - 5,
            top: mark.y - 5,
            width: `10px`,
            height: `10px`,
          }}
          title={mark.characterName}
        />
      ))}
      {gameState.showPopup && (
        <div
          className={`w-fit fixed top-1/4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
            gameState.foundCharacter ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {gameState.foundCharacter ? (
            <div className="flex items-center justify-center gap-2">
              <FaCheckCircle className="text-white" />
              <span>You found {gameState.foundCharacter}!</span>
            </div>
          ) : (
            <span>Try again!</span>
          )}
        </div>
      )}
      {gameOver && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" />
          <LeaderboardForm totalTime={gameState.totalTime} />
        </>
      )}
    </div>
  );
}

export default PhotoDisplay;
