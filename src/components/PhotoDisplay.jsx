import { useState } from "react";
import Dropdown from "./common/Dropdown";

function PhotoDisplay() {
  const [boxPosition, setBoxPosition] = useState(null);

  const handleImageClick = (e) => {
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
  };

  return (
    <div className="relative">
      <img
        src="../../public/game-picture.jpg"
        alt="game image"
        className="w-full h-auto cursor-pointer z-10"
        onClick={handleImageClick}
      />
      {boxPosition && (
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
          <Dropdown boxPosition={boxPosition} />
        </>
      )}
    </div>
  );
}

export default PhotoDisplay;
