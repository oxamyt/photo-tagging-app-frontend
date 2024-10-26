import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function GameLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default GameLayout;
