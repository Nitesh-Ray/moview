// src/App.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Lazy load pages – each loads only when visited
const HomePage = lazy(() => import('./pages/HomePage'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'));

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-xl animate-pulse">🎬 Loading...</p>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}