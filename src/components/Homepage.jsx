import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="w-full bg-[#181a1f] min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-[#e8ecef] mb-8">
        Welcome to the Photo Tagging App!
      </h1>
      <Link
        to={"/game"}
        className="text-2xl font-semibold text-[#f0f4f8] bg-[#3a8dff] hover:bg-[#306bcb] px-8 py-4 rounded-full shadow-lg transition duration-300"
      >
        Play Game
      </Link>
    </div>
  );
}

export default Homepage;
