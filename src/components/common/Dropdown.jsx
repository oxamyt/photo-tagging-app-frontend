import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Dropdown({ boxPosition, handleCharacterClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [characters] = useOutletContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    calculatePosition();

    return () => clearTimeout(timer);
  }, []);

  const calculatePosition = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const offsetX = isMobile ? 20 : isTablet ? 40 : 60;
    const offsetY = isMobile ? 20 : isTablet ? 30 : 50;

    const top = boxPosition.y - offsetY;
    let left = boxPosition.x + offsetX;

    const dropdownWidth = 150;
    const maxX = window.innerWidth;

    if (left + dropdownWidth > maxX) {
      left = isMobile
        ? boxPosition.x - 150
        : isTablet
        ? boxPosition.x - 250
        : boxPosition.x - 300;
    }

    setPosition({ left, top });
  };

  return (
    <div
      className="absolute bg-lightBg dark:bg-darkBg bg-opacity-90 rounded-lg shadow-lg z-10"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      <ul
        className={`p-4 space-y-2 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {characters.map((character) => (
          <div className="flex" key={character.name}>
            <img
              src={character.characterImageUrl}
              alt={`${character.name} character`}
              className={`cursor-pointer rounded-lg w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${
                character.found ? "grayscale" : ""
              }  transition duration-300`}
            />
            <li
              key={character.name}
              className={`text-xs md:text-xl lg:text-2xl font-semibold  ${
                character.found
                  ? "text-stone-600"
                  : "text-yellow-500 dark:text-yellow-300"
              } cursor-pointer transition duration-150`}
              onClick={
                character.found
                  ? null
                  : () => handleCharacterClick(character.name)
              }
              aria-label={character.name}
            >
              {character.name}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  boxPosition: PropTypes.object.isRequired,
  handleCharacterClick: PropTypes.func.isRequired,
};
