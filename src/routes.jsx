import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import PhotoDisplay from "./components/PhotoDisplay.jsx";
import GameLayout from "./components/Layout/GameLayout.jsx";
import Homepage from "./components/Homepage.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import NotFound from "./components/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/leaderboard", element: <Leaderboard /> },
    ],
  },
  {
    path: "/game1",
    element: <GameLayout pictureName="Big" />,
    children: [{ index: true, element: <PhotoDisplay /> }],
  },
  {
    path: "/game2",
    element: <GameLayout pictureName="Magic_Alley" />,
    children: [{ index: true, element: <PhotoDisplay /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
