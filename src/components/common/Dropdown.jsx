import PropTypes from "prop-types";

function Dropdown({ boxPosition }) {
  return (
    <div
      data-testid="dropdown"
      className="absolute bg-opacity-30 bg-blue-800"
      style={{
        left: boxPosition.x + 100,
        top: boxPosition.y,
        width: `100px`,
        height: `100px`,
      }}
    />
  );
}

export default Dropdown;

Dropdown.propTypes = {
  boxPosition: PropTypes.object.isRequired,
};
