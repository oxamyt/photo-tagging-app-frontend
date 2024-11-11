import { useEffect } from "react";
import PropTypes from "prop-types";

function Timer({ time, setTime, gameOver }) {
  const convertTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return (
      <p className="text-3xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300">
        {minutes >= 10 ? minutes : `0${minutes}`}:
        {seconds >= 10 ? seconds : `0${seconds}`}:
        {milliseconds < 100 ? `0${milliseconds}` : milliseconds}
      </p>
    );
  };

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameOver, setTime]);

  return <div>{convertTime()}</div>;
}

Timer.propTypes = {
  gameOver: PropTypes.bool,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
};

export default Timer;
