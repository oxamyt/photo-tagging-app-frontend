import PropTypes from "prop-types";

function Images({
  images,
  fetchLeaderboard,
  setLoading,
  setLeaderboardData,
  setError,
}) {
  return (
    <div className="w-ful cursor-pointer grid grid-cols-2   justify-center gap-4 mb-8">
      {images.map((image) => (
        <div
          key={image.id}
          onClick={() =>
            fetchLeaderboard(image.id, setLoading, setLeaderboardData, setError)
          }
        >
          <h1 className="text-xl text-center font-semibold">{image.name}</h1>
          <img
            src={image.url}
            alt={image.name}
            className="w-32 h-32 md:w-52 md:h-52 lg:w-64 lg:h-64  object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
}

Images.propTypes = {
  images: PropTypes.array,
  fetchLeaderboard: PropTypes.func,
  setLoading: PropTypes.func,
  setLeaderboardData: PropTypes.func,
  setError: PropTypes.func,
};

export default Images;
