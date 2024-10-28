import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function Dropdown({ boxPosition, handleCharacterClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      data-testid="dropdown"
      className="absolute bg-blue-900 bg-opacity-90 rounded-lg shadow-lg z-10"
      style={{
        left: boxPosition.x >= 1600 ? boxPosition.x - 210 : boxPosition.x + 100,
        top: boxPosition.y,
      }}
    >
      <ul
        className={`p-4 space-y-2 transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <li
          onClick={() => handleCharacterClick("Tom")}
          aria-label="Tom"
          className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 "
        >
          Tom
        </li>
        <li className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 ">
          Tommy Vercetti
        </li>
        <li className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 ">
          Patrick
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  boxPosition: PropTypes.object.isRequired,
  handleCharacterClick: PropTypes.func.isRequired,
};
