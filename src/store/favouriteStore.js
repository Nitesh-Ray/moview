// src/store/favouriteStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavouriteStore = create(
  persist(
    (set) => ({
      favourites: [],
      addFavourite: (movie) =>
        set((state) => ({
          favourites: [...state.favourites, movie],
        })),
      removeFavourite: (imdbID) =>
        set((state) => ({
          favourites: state.favourites.filter((m) => m.imdbID !== imdbID),
        })),
    }),
    { name: 'movie-favourites' }
  )
);