import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import PropTypes from "prop-types";

function GameLayout({ pictureName }) {
  const [characters, setCharacters] = useState();

  const [gameOver, setGameOver] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);

  const [time, setTime] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        time={time}
        setTime={setTime}
        characters={characters}
        gameOver={gameOver}
        renderTimer={true}
        gameStarted={gameStarted}
      />
      <Outlet
        context={[
          characters,
          setCharacters,
          gameOver,
          setGameOver,
          time,
          setTime,
          setGameStarted,
          pictureName,
        ]}
      />
      <Footer />
    </div>
  );
}

GameLayout.propTypes = {
  pictureName: PropTypes.string,
};

export default GameLayout;
