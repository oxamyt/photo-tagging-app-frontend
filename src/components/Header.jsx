import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Timer from "./common/Timer";

function Header({
  gameStarted,
  time,
  setTime,
  characters,
  gameOver,
  renderTimer,
}) {
  return (
    <header className="sticky top-0 z-20 max-w-full flex justify-between items-center bg-[#1e3a8a] p-6 shadow-md">
      <Link
        to={"/"}
        className="text-3xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300"
      >
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
        <Link
          to={"/leaderboard"}
          className="text-3xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300"
        >
          Leaderboard
        </Link>
      )}

      {characters && (
        <section>
          <ul className="flex font-bold text-2xl gap-2 justify-center items-center">
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
