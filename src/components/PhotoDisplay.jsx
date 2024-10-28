import { useState } from "react";
import Dropdown from "./common/Dropdown";
import { postCoordinatesRequest } from "../utils/api";

function PhotoDisplay({ sendCoordinates }) {
  const [boxPosition, setBoxPosition] = useState(null);
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleImageClick = (e) => {
    if (!showTargetingBox) {
      const { clientX, clientY } = e;
      const boxWidth = 100;
      const boxHeight = 100;

      const imgRect = e.target.getBoundingClientRect();
      const adjustedX = clientX - imgRect.left - boxWidth / 2;
      const adjustedY = clientY - imgRect.top - boxHeight / 2;

      setBoxPosition({
        x: adjustedX,
        y: adjustedY,
      });
      setCoordinates({
        x: adjustedX + 100,
        y: adjustedY + 100,
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
        console.log("Correct");
      } else {
        console.log("Incorrect");
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
        className="w-full h-auto cursor-pointer z-10"
        onClick={handleImageClick}
      />
      {showTargetingBox && (
        <>
          <div
            data-testid="targeting-box"
            className="absolute border-2 rounded-full bg-opacity-30  bg-stone-100  border-stone-100 border-dashed"
            style={{
              left: boxPosition.x,
              top: boxPosition.y,
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
    </div>
  );
}

export default PhotoDisplay;
