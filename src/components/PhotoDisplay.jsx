import { useState } from "react";
import Dropdown from "./common/Dropdown";
import { postCoordinatesRequest } from "../utils/api";

function PhotoDisplay() {
  const [boxPosition, setBoxPosition] = useState(null);
  const [showTargetingBox, setShowTargetingBox] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

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
    </div>
  );
}

export default PhotoDisplay;
