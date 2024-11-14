import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Timer from "./common/Timer";
import { useState } from "react";

function Header({
  gameStarted,
  time,
  setTime,
  characters,
  gameOver,
  renderTimer,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="sticky top-0 z-20 text-xl lg:text-3xl max-w-full flex justify-between items-center text-[#d1d9e0] bg-[#1c1f26] p-6 shadow-md">
      <Link to={"/"} className="font-bold">
        Photo Tagging App
      </Link>

      {renderTimer ? (
        <Timer
          gameStarted={gameStarted}
          time={time}
          setTime={setTime}
          gameOver={gameOver}
        />
      ) : (
        <Link to={"/leaderboard"} className="font-bold">
          Leaderboard
        </Link>
      )}

      {characters && (
        <section className="relative">
          <button
            onClick={toggleDropdown}
            className="lg:hidden font-bold bg-gray-800 text-white py-2 px-4 rounded-md"
          >
            Characters
          </button>

          <ul
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } absolute right-0 mt-2 py-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg lg:hidden`}
          >
            {characters.map((character) => (
              <li
                key={character.name}
                style={{
                  color: character.found ? "green" : "yellow",
                }}
                aria-label={character.name}
                className="px-4 py-2"
              >
                {character.name}
              </li>
            ))}
          </ul>

          <ul className="hidden lg:flex gap-2 font-bold">
            {characters.map((character) => (
              <li
                key={character.name}
                style={{
                  color: character.found ? "green" : "yellow",
                }}
                aria-label={character.name}
              >
                {character.name}
              </li>
            ))}
          </ul>
        </section>
      )}
    </header>
  );
}

Header.propTypes = {
  characters: PropTypes.array,
  gameOver: PropTypes.bool,
  renderTimer: PropTypes.bool,
  time: PropTypes.number,
  setTime: PropTypes.func,
  gameStarted: PropTypes.bool,
};

export default Header;
