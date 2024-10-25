import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1>Photo Tagging App</h1>
      <Outlet />
    </div>
  );
}

export default App;
