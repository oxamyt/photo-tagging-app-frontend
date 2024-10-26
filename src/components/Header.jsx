import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="max-w-full flex justify-between items-center bg-[#1e3a8a] p-6 shadow-md">
      <Link
        to={"/"}
        className="text-3xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300"
      >
        Photo Tagging App
      </Link>
    </header>
  );
}

export default Header;
