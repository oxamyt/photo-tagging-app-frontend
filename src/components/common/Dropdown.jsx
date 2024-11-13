import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Dropdown({ boxPosition, handleCharacterClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const [characters] = useOutletContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="absolute bg-blue-900 bg-opacity-90 rounded-lg shadow-lg z-10"
      style={{
        left: boxPosition.x >= 1600 ? boxPosition.x - 260 : boxPosition.x + 50,
        top: boxPosition.y - 50,
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
            className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 "
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
