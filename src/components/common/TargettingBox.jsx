import PropTypes from "prop-types";

function TargetingBox({ gameState }) {
  return (
    <div
      className="absolute border-2 rounded-full bg-opacity-30 bg-stone-100 border-stone-100 border-dashed"
      style={{
        left: gameState.boxPosition.x - (window.innerWidth < 768 ? 10 : 50),
        top: gameState.boxPosition.y - (window.innerWidth < 768 ? 10 : 50),
        width: window.innerWidth < 768 ? `30px` : `100px`,
        height: window.innerWidth < 768 ? `30px` : `100px`,
      }}
    />
  );
}

TargetingBox.propTypes = {
  gameState: PropTypes.object.isRequired,
};

export default TargetingBox;
