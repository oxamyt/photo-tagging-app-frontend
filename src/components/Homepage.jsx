import { Link } from "react-router-dom";

function Homepage() {
  return (
    <main className="w-full bg-lightBg grow dark:bg-[#181a1f]  flex flex-col items-center justify-center transition duration-300">
      <h1 className="text-black dark:text-white  text-3xl lg:text-4xl font-bold text-center  mb-8">
        Welcome to the SpotQuest!
      </h1>
      <Link
        to={"/game1"}
        className="text-2xl font-semibold text-white bg-yellow-500 dark:bg-yellow-300 dark:text-black hover:bg-yellow-400 hover:dark:bg-yellow-200  px-8 py-4 rounded-full shadow-lg transition duration-300"
      >
        Play Game
      </Link>
    </main>
  );
}

export default Homepage;
