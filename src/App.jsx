import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header renderTimer={false} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
