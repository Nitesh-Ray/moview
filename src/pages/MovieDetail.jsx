// src/pages/MovieDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavouriteStore } from '../store/favouriteStore';

const API_KEY = 'c8ea232e'; // Replace with your key

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const favourites = useFavouriteStore((state) => state.favourites);
  const addFavourite = useFavouriteStore((state) => state.addFavourite);
  const removeFavourite = useFavouriteStore((state) => state.removeFavourite);
  const isFav = favourites.some((m) => m.imdbID === movieId);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`);
        const data = await res.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  const toggleFav = () => {
    if (isFav) {
      removeFavourite(movieId);
    } else {
      addFavourite(movie);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 gap-4">
        <p className="text-xl text-red-500">{error || 'Movie not found'}</p>
        <Link to="/" className="text-blue-500 hover:underline">← Back to search</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← Back to search</Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-4">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{movie.Title}</h1>
                <button
                  onClick={toggleFav}
                  className="text-3xl hover:scale-110 transition-transform"
                >
                  {isFav ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="flex gap-4 mt-2 text-gray-500 dark:text-gray-400">
                <span>{movie.Year}</span>
                <span>{movie.Rated}</span>
                <span>{movie.Runtime}</span>
              </div>
              <p className="mt-4 italic text-gray-600 dark:text-gray-300">{movie.Plot}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold">Director:</span> {movie.Director}
                </div>
                <div>
                  <span className="font-bold">Cast:</span> {movie.Actors}
                </div>
                <div>
                  <span className="font-bold">Genre:</span> {movie.Genre}
                </div>
                <div>
                  <span className="font-bold">IMDB Rating:</span> ⭐ {movie.imdbRating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}