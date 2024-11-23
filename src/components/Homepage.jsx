import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImages } from "../utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Homepage() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await getImages();

        setImages(response.Images);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="w-full text-black dark:text-white  bg-lightBg grow dark:bg-darkBg  flex flex-col items-center justify-center transition duration-300">
      <h1 className="text-black dark:text-white  text-3xl lg:text-4xl font-bold text-center  mb-8">
        Welcome to the SpotQuest!
      </h1>
      <h1 className="text-yellow-500 dark:text-yellow-300  text-3xl lg:text-4xl font-bold text-center  mb-8">
        Choose your game
      </h1>

      {loading && (
        <div className="flex items-center justify-center w-full h-screen">
          <AiOutlineLoading3Quarters className="animate-spin h-12 w-12 text-gray-500" />
        </div>
      )}

      {error && <p className="text-lg text-red-600">{error}</p>}

      <div className="flex items-center justify-center gap-11">
        {images.map((image) => (
          <Link
            to={`/game${image.id}`}
            className="hover:scale-105 hover:text-yellow-500 hover:dark:text-yellow-300 duration-300"
            key={image.id}
          >
            <h1 className="text-xl text-center font-semibold">{image.name}</h1>
            <img
              src={image.url}
              alt={image.name}
              className="w-32 h-32 md:w-52 md:h-52 lg:w-64 lg:h-64  object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Homepage;
