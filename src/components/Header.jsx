import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Timer from "./common/Timer";
import { useState } from "react";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "./contexts/ThemeContext";
function Header({
  gameStarted,
  time,
  setTime,
  characters,
  gameOver,
  renderTimer,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="sticky top-0 z-20 bg-lightBg dark:bg-[#1c1f26] text-xl lg:text-3xl max-w-full flex justify-between items-center text-black dark:text-white  transition duration-300  p-6 shadow-md">
      <MdLightMode
        onClick={toggleTheme}
        className="p-2 rounded  w-10 h-10 cursor-pointer dark:text-gray-100"
      />

      <Link
        to={"/"}
        className="font-bold hover:text-yellow-300 transition duration-300"
      >
        SpotQuest
      </Link>

      {renderTimer ? (
        <Timer
          gameStarted={gameStarted}
          time={time}
          setTime={setTime}
          gameOver={gameOver}
        />
      ) : (
        <Link
          to={"/leaderboard"}
          className="font-bold hover:text-yellow-300 transition duration-300"
        >
          Leaderboard
        </Link>
      )}

      {characters && (
        <section className="relative">
          <button
            onClick={toggleDropdown}
            className="lg:hidden font-bold bg-gray-800 text-white hover:text-black hover:bg-stone-100 transition duration-300  py-2 px-4 rounded-md"
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
