// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import FavouritesPage from './pages/FavouritesPage';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </div>
  );
}