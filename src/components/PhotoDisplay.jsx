import { useState } from "react";
import Dropdown from "./common/Dropdown";
import { postCoordinatesRequest } from "../utils/api";
import { useOutletContext } from "react-router-dom";

function PhotoDisplay() {
  const [boxPosition, setBoxPosition] = useState(null);
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [successMarkPosition, setSuccessMarkPosition] = useState([]);
  const [, setCharacters] = useOutletContext();

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
        setCharacters((prevCharacters) =>
          prevCharacters.map((char) =>
            char.name === characterName ? { ...char, found: true } : char
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <img
        src="../../public/game-picture.jpg"
        alt="game image"
        className="cursor-pointer z-10"
        onClick={handleImageClick}
      />
      {showTargetingBox && (
        <>
          <div
            data-testid="targeting-box"
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
    </div>
  );
}

export default PhotoDisplay;
