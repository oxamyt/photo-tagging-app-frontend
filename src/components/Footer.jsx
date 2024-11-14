import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="max-w-full flex justify-center text-[#c0c7d0]  items-center bg-[#23272e] p-6 shadow-md">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-3 items-center text-xl font-bold"
        href="https://github.com/oxamyt"
      >
        Oxamyt
        <FaGithub size={35} />
      </a>
    </footer>
  );
}

export default Footer;
