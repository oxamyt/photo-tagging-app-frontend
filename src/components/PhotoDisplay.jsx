import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaMapMarker } from "react-icons/fa";
import Dropdown from "./common/Dropdown";
import { postStartTimerRequest, getGameData } from "../utils/api";
import { useOutletContext } from "react-router-dom";
import LeaderboardForm from "./common/LeaderboardForm";
import {
  handleCharacterClick,
  handleImageClick,
} from "../utils/imageManipulation";
import TargetingBox from "./common/TargettingBox";
import Popup from "./common/Popup";

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

  useEffect(() => {
    const fetchGameData = async () => {
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
    };

    fetchGameData();
  }, []);

  return (
    <main className="w-full">
      <div className="relative">
        {!gameState.image && (
          <div className="flex items-center justify-center w-screen h-screen ">
            <AiOutlineLoading3Quarters className="animate-spin h-16 w-16 text-gray-500" />
          </div>
        )}
        <img
          src={gameState.image}
          alt="game image"
          className="cursor-pointer w-screen h-auto z-10 game-image"
          onClick={(e) => handleImageClick(e, gameState, setGameState)}
        />
        {gameState.showTargetingBox && (
          <>
            <TargetingBox gameState={gameState} />
            <Dropdown
              handleCharacterClick={(characterName) =>
                handleCharacterClick(
                  characterName,
                  setGameState,
                  gameState,
                  setCharacters,
                  setGameOver,
                  time
                )
              }
              boxPosition={gameState.boxPosition}
            />
          </>
        )}
        {gameState.successMarkPosition.map((mark, index) => (
          <FaMapMarker
            key={index}
            className="absolute z-10"
            style={{
              left: mark.x - 5,
              top: mark.y - 5,
              width: `1rem`,
              height: `1rem`,
              color: "red",
            }}
            title={mark.characterName}
          />
        ))}
        {gameState.showPopup && <Popup gameState={gameState} />}
        {gameOver && (
          <>
            <div className="fixed inset-0 bg-black opacity-50" />
            <LeaderboardForm totalTime={gameState.totalTime} />
          </>
        )}
      </div>
    </main>
  );
}

export default PhotoDisplay;
