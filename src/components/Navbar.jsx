// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useFavouriteStore } from '../store/favouriteStore';

export default function Navbar() {
  const favourites = useFavouriteStore((state) => state.favourites);
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          🎬 MovieApp
        </Link>
        <div className="flex gap-6">
          <Link
            to="/"
            className={`hover:text-blue-500 ${location.pathname === '/' ? 'text-blue-500 font-bold' : ''}`}
          >
            Search
          </Link>
          <Link
            to="/favourites"
            className={`hover:text-blue-500 flex items-center gap-1 ${location.pathname === '/favourites' ? 'text-blue-500 font-bold' : ''}`}
          >
            Favourites {favourites.length > 0 && `(${favourites.length})`}
          </Link>
        </div>
      </div>
    </nav>
  );
}