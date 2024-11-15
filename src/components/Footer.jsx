import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="max-w-full flex justify-center text-black dark:text-white  items-center bg-lightBg dark:bg-darkBg p-6 shadow-md transition duration-300">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-3 items-center text-xl font-bold hover:text-yellow-300 transition duration-300"
        href="https://github.com/oxamyt"
      >
        Oxamyt
        <FaGithub size={35} />
      </a>
    </footer>
  );
}

export default Footer;
