import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ characters }) {
  return (
    <header className="sticky top-0 z-20 max-w-full flex justify-between items-center bg-[#1e3a8a] p-6 shadow-md">
      <Link
        to={"/"}
        className="text-3xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300"
      >
        Photo Tagging App
      </Link>
      <section>
        <ul>
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
    </header>
  );
}

export default Header;

Header.propTypes = {
  characters: PropTypes.array,
};
