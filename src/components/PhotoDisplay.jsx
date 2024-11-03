import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Dropdown from "./common/Dropdown";
import { postCoordinatesRequest } from "../utils/api";
import { useOutletContext } from "react-router-dom";

function PhotoDisplay() {
  const [boxPosition, setBoxPosition] = useState(null);
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [successMarkPosition, setSuccessMarkPosition] = useState([]);
  const [, setCharacters, gameOver, setGameOver] = useOutletContext();
  const [showPopup, setShowPopup] = useState(false);
  const [foundCharacter, setFoundCharacter] = useState(null);

  const handleImageClick = (e) => {
    if (!showTargetingBox) {
      const img = e.currentTarget;
      const imageRect = img.getBoundingClientRect();
      const { clientX, clientY } = e;

      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      const displayedWidth = imageRect.width;
      const displayedHeight = imageRect.height;

      const relativeX = clientX - imageRect.left;
      const relativeY = clientY - imageRect.top;

      const scaleX = naturalWidth / displayedWidth;
      const scaleY = naturalHeight / displayedHeight;

      const naturalX = relativeX * scaleX;
      const naturalY = relativeY * scaleY;

      setBoxPosition({
        x: relativeX,
        y: relativeY,
      });
      setCoordinates({
        x: naturalX,
        y: naturalY,
      });

      setShowTargetingBox(true);
    } else {
      setShowTargetingBox(false);
    }
  };

  const handleCharacterClick = async (characterName) => {
    setShowTargetingBox(false);
    try {
      const response = await postCoordinatesRequest(coordinates, characterName);
      if (response.success) {
        const img = document.querySelector("img");
        const imageRect = img.getBoundingClientRect();

        const scaleX = imageRect.width / img.naturalWidth;
        const scaleY = imageRect.height / img.naturalHeight;

        const displayedX = response.correctCoordinates.x * scaleX;
        const displayedY = response.correctCoordinates.y * scaleY;

        setSuccessMarkPosition((prevMarks) => [
          ...prevMarks,
          { characterName, x: displayedX, y: displayedY },
        ]);
        setCharacters((prevCharacters) => {
          const updatedCharacters = prevCharacters.map((char) =>
            char.name === characterName ? { ...char, found: true } : char
          );

          checkWin(updatedCharacters);

          return updatedCharacters;
        });
        setFoundCharacter(characterName);
        setShowPopup(true);

        setTimeout(() => setShowPopup(false), 2000);
        setTimeout(() => setFoundCharacter(null), 2000);
      } else {
        setFoundCharacter(null);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkWin = async (characters) => {
    const allFound = characters.reduce(
      (acc, character) => acc && character.found,
      true
    );

    if (allFound) {
      console.log("All characters found!");
      setGameOver(true);
    } else {
      console.log("Not all characters are found yet.");
    }
  };

  return (
    <div className="relative">
      <img
        src="/game-picture.jpg"
        alt="game image"
        className="cursor-pointer z-10"
        onClick={handleImageClick}
      />
      {showTargetingBox && (
        <>
          <div
            className="absolute border-2 rounded-full bg-opacity-30 bg-stone-100 border-stone-100 border-dashed"
            style={{
              left: boxPosition.x - 50,
              top: boxPosition.y - 50,
              width: `100px`,
              height: `100px`,
            }}
          />
          <Dropdown
            handleCharacterClick={handleCharacterClick}
            boxPosition={boxPosition}
          />
        </>
      )}
      {successMarkPosition.map((mark, index) => (
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
      {showPopup && (
        <div
          className={` w-fit fixed top-1/4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
            foundCharacter ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {foundCharacter ? (
            <div className="flex items-center justify-center gap-2">
              <FaCheckCircle className="text-white" />
              <span>You found {foundCharacter}!</span>
            </div>
          ) : (
            <span>Try again!</span>
          )}
        </div>
      )}
      {gameOver && (
        <>
          <div className="fixed inset-0 bg-black opacity-50" />
          <div className="w-fit fixed top-1/2 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white bg-green-800 z-20">
            <h2 className="text-lg text-center font-bold">Game Over</h2>
            <p className="mt-2">You found all the characters!</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PhotoDisplay;
