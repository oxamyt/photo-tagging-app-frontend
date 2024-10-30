import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useState } from "react";

function GameLayout() {
  const [characters, setCharacters] = useState([
    { name: "Tom", found: false },
    { name: "Tommy Vercetti", found: false },
    { name: "Patrick", found: false },
  ]);

  return (
    <div className="min-h-screen  bg-gray-50">
      <Header characters={characters} />
      <Outlet context={[characters, setCharacters]} />
      <Footer />
    </div>
  );
}

export default GameLayout;
