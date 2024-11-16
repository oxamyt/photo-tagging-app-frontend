import { FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";

function Popup({ gameState }) {
  return (
    <div
      className={`w-fit fixed top-1/4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${
        gameState.foundCharacter ? "bg-green-600" : "bg-red-500"
      }`}
    >
      {gameState.foundCharacter ? (
        <div className="flex items-center justify-center gap-2">
          <FaCheckCircle className="text-white" />
          <span>You found {gameState.foundCharacter}!</span>
        </div>
      ) : (
        <span>Try again!</span>
      )}
    </div>
  );
}

Popup.propTypes = {
  gameState: PropTypes.object.isRequired,
};

export default Popup;
