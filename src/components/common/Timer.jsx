import { useEffect, useState } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  const handleTimer = () => {
    if (!isRunning) {
      clearInterval(intervalId);
    }
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const convertTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return (
      <p>
        {" "}
        {minutes > 10 ? minutes : `0${minutes}`}:
        {seconds > 10 ? seconds : `0${seconds}`}{" "}
      </p>
    );
  };

  useEffect(() => handleTimer, []);

  return <div>{convertTime()}</div>;
}

export default Timer;
