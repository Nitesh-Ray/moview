// src/hooks/useMovieSearch.js
import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

const API_KEY = 'c8ea232e'; // Replace with your key

export function useMovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await res.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedQuery]);

  return { query, setQuery, movies, loading, error };
}