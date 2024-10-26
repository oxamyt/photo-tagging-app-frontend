import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="w-full bg-[#f0f4f8] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Welcome to the Photo Tagging App!
      </h1>
      <Link
        to={"/game"}
        className="text-2xl font-semibold text-white bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full shadow-lg transition duration-300"
      >
        Play Game
      </Link>
    </div>
  );
}

export default Homepage;
