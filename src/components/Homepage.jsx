import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="w-full bg-lightBg grow dark:bg-[#181a1f]  flex flex-col items-center justify-center transition duration-300">
      <h1 className="text-black dark:text-white  text-3xl lg:text-4xl font-bold text-center  mb-8">
        Welcome to the SpotQuest!
      </h1>
      <Link
        to={"/game"}
        className="text-2xl font-semibold text-[#f0f4f8] bg-[#3a8dff] hover:bg-[#306bcb] focus:bg-[#295292] px-8 py-4 rounded-full shadow-lg transition duration-300"
      >
        Play Game
      </Link>
    </div>
  );
}

export default Homepage;
