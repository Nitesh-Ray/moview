// src/pages/FavouritesPage.jsx
import { Link } from 'react-router-dom';
import { useFavouriteStore } from '../store/favouriteStore';

export default function FavouritesPage() {
  const favourites = useFavouriteStore((state) => state.favourites);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);

  if (favourites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto text-center mt-20">
          <h1 className="text-3xl font-bold mb-4">My Favourites</h1>
          <p className="text-gray-500 text-lg">No favourite movies yet.</p>
          <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Go search for movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Favourites ({favourites.length})</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favourites.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow relative">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                  alt={movie.Title}
                  className="w-full h-72 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFavourite(movie.imdbID);
                  }}
                  className="absolute top-2 right-2 bg-black/50 rounded-full p-2 text-white hover:scale-110"
                >
                  ❌
                </button>
                <div className="p-4">
                  <h3 className="font-bold truncate">{movie.Title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{movie.Year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}