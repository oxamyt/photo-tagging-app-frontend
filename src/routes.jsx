import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import PhotoDisplay from "./components/PhotoDisplay.jsx";
import GameLayout from "./components/Layout/GameLayout.jsx";
import Homepage from "./components/Homepage.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import NotFound from "./components/NotFound.jsx";

const gameRoutes = [
  { path: "game1", pictureName: "Big" },
  { path: "game2", pictureName: "Magic_Alley" },
  { path: "game3", pictureName: "Game" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "leaderboard", element: <Leaderboard /> },
    ],
  },
  ...gameRoutes.map((game) => ({
    path: `/${game.path}`,
    element: <GameLayout pictureName={game.pictureName} />,
    children: [{ index: true, element: <PhotoDisplay /> }],
  })),
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
