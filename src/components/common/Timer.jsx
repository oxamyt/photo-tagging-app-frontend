import { useEffect } from "react";
import PropTypes from "prop-types";

function Timer({ gameStarted, time, setTime, gameOver }) {
  const convertTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return (
      <p className="text-sm  lg:text-3xl font-bold text-yellow-300 ">
        {minutes >= 10 ? minutes : `0${minutes}`}:
        {seconds >= 10 ? seconds : `0${seconds}`}:
        {milliseconds < 100 ? `0${milliseconds}` : milliseconds}
      </p>
    );
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameStarted, setTime, gameOver]);

  return <div className=" w-64 ">{convertTime()}</div>;
}

Timer.propTypes = {
  gameOver: PropTypes.bool,
  time: PropTypes.number.isRequired,
  setTime: PropTypes.func.isRequired,
  gameStarted: PropTypes.bool,
};

export default Timer;
