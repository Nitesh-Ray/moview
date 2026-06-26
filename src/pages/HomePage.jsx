// src/pages/HomePage.jsx
import { useMovieSearch } from '../hooks/useMovieSearch';
import MovieCard from '../components/MovieCard';

export default function HomePage() {
  const { query, setQuery, movies, loading, error } = useMovieSearch();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🎬 Movie Search</h1>

        {/* Search input */}
        <div className="relative max-w-xl mx-auto mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full border p-4 pl-12 rounded-xl shadow text-lg dark:bg-gray-800 dark:border-gray-700"
            autoFocus
          />
          <span className="absolute left-4 top-4 text-xl">🔍</span>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 text-lg">Searching...</p>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Movie grid */}
        {movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && query && movies.length === 0 && (
          <p className="text-center text-gray-500 text-lg">No movies found.</p>
        )}

        {/* Initial state */}
        {!query && (
          <p className="text-center text-gray-400 text-lg mt-12">
            Start typing to search for movies
          </p>
        )}
      </div>
    </div>
  );
}