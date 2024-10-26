import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="max-w-full flex justify-center items-center bg-[#1e3a8a] p-6 shadow-md">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-3 items-center text-xl font-bold text-yellow-300 hover:text-yellow-400 transition duration-300"
        href="https://github.com/oxamyt"
      >
        Oxamyt
        <FaGithub size={35} color="#FFD166" />
      </a>
    </footer>
  );
}

export default Footer;
