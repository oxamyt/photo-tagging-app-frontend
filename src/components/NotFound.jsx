import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="w-full bg-lightBg grow dark:bg-[#181a1f]  flex flex-col items-center justify-center transition duration-300">
        <h1 className="text-black dark:text-white  text-3xl lg:text-4xl font-bold text-center  mb-8">
          404 Not Found
        </h1>
        <Link
          to={"/"}
          className="text-2xl font-semibold text-white bg-yellow-500 dark:bg-yellow-300 dark:text-black hover:bg-yellow-400 hover:dark:bg-yellow-200  px-8 py-4 rounded-full shadow-lg transition duration-300"
        >
          Go to Homepage
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
