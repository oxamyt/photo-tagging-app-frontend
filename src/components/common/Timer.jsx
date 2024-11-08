import { useEffect } from "react";
import PropTypes from "prop-types";

function Timer({ time, setTime, gameOver }) {
  const convertTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return (
      <p className="text-3xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300">
        {" "}
        {minutes >= 10 ? minutes : `0${minutes}`}:
        {seconds >= 10 ? seconds : `0${seconds}`}{" "}
      </p>
    );
  };

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameOver]);

  return <div>{convertTime()}</div>;
}

Timer.propTypes = {
  gameOver: PropTypes.bool,
  time: PropTypes.number,
  setTime: PropTypes.func,
};

export default Timer;
