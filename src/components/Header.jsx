import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Timer from "./common/Timer";
import { useState } from "react";
import { MdLightMode } from "react-icons/md";
import { useTheme } from "./contexts/ThemeContext";
import { FaMoon } from "react-icons/fa";

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
    <header className="sticky top-0 z-20 bg-lightBg dark:bg-[#1c1f26] text-xl lg:text-3xl max-w-full gap-3 flex justify-between items-center text-black dark:text-white  transition duration-300  p-6 shadow-md">
      <div className="flex justify-center items-center gap-5">
        {theme === "dark" ? (
          <FaMoon
            onClick={toggleTheme}
            className="select-none rounded  w-8 h-8 lg:w-10 lg:h-10 cursor-pointer dark:text-gray-100 hover:scale-125 duration-300 "
          />
        ) : (
          <MdLightMode
            onClick={toggleTheme}
            className="select-none rounded  w-8 h-8  lg:w-10 lg:h-10 cursor-pointer dark:text-gray-100 hover:scale-125 duration-300 "
          />
        )}

        <Link
          to={"/"}
          className="font-bold  hover:text-yellow-500 hover:dark:text-yellow-300 transition duration-300"
        >
          Spo<span className="text-yellow-500 dark:text-yellow-300">t</span>Ques
          <span className="text-yellow-500 dark:text-yellow-300">t</span>
        </Link>
      </div>

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
            className="lg:hidden select-none md:hidden font-bold bg-yellow-500 dark:bg-yellow-300 text-black transition duration-300 py-2 px-4 rounded-full"
          >
            3
          </button>

          <button
            onClick={toggleDropdown}
            className="lg:hidden hidden md:flex border-2 border-darkBg dark:border-lightBg font-bold bg-lightBg text-black dark:bg-darkBg dark:text-white transition duration-300 py-2 px-4 rounded-md"
          >
            Characters
          </button>

          <ul
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } absolute right-0 mt-2 py-2 w-48 bg-lightBg text-black dark:bg-darkBg dark:text-white rounded-lg shadow-lg lg:hidden`}
          >
            {characters.map((character) => (
              <li
                key={character.name}
                style={{
                  color: character.found ? "green" : "",
                }}
                aria-label={character.name}
                className="px-4 py-2 rounded-bg flex items-center gap-2"
              >
                <img
                  src={character.characterImageUrl}
                  alt={`${character.name} character`}
                  className="w-8 h-8"
                />
                {character.name}
              </li>
            ))}
          </ul>

          <ul className="hidden lg:flex gap-2 font-bold text-yellow-500 dark:text-yellow-300">
            {characters.map((character) => (
              <li key={character.name} className="flex items-center gap-2">
                <img
                  src={character.characterImageUrl}
                  alt={`${character.name} character`}
                  className="cursor-pointer rounded-lg w-16 h-16  hover:scale-110 transform transition duration-300"
                />
                <span
                  style={{
                    color: character.found ? "green" : "",
                  }}
                  aria-label={character.name}
                >
                  {character.name}
                </span>
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
