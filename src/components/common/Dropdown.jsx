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
      className="absolute bg-[#181a1f] bg-opacity-90 rounded-lg shadow-lg z-10"
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
          <li
            key={character.name}
            className="text-xs md:text-xl lg:text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 "
            onClick={() => handleCharacterClick(character.name)}
            aria-label={character.name}
          >
            {character.name}
          </li>
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
