// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';
import { useFavouriteStore } from '../store/favouriteStore';

export default function MovieCard({ movie }) {
  const favourites = useFavouriteStore((state) => state.favourites);
  const addFavourite = useFavouriteStore((state) => state.addFavourite);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);
  const isFav = favourites.some((m) => m.imdbID === movie.imdbID);

  const toggleFav = (e) => {
    e.preventDefault(); // Stop link navigation
    if (isFav) {
      removeFavourite(movie.imdbID);
    } else {
      addFavourite(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.Title}
            className="w-full h-72 object-cover"
          />
          <button
            onClick={toggleFav}
            className="absolute top-2 right-2 bg-black/50 rounded-full p-2 text-white hover:scale-110 transition-transform"
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{movie.Title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
}