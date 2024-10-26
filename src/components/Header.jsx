import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-20 max-w-full flex justify-between items-center bg-[#1e3a8a] p-6 shadow-md">
      <Link
        to={"/"}
        className="text-3xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300"
      >
        Photo Tagging App
      </Link>
      <section>
        <ul className="flex justify-center items-center gap-3">
          <li className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 ">
            Tom
          </li>
          <li className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 ">
            Tommy Vercetti
          </li>
          <li className="text-2xl font-semibold text-yellow-400 hover:text-yellow-500 cursor-pointer transition duration-150 ">
            Patrick
          </li>
        </ul>
      </section>
    </header>
  );
}

export default Header;
