import { createSlice } from '@reduxjs/toolkit';
import type { MoviesState } from './movieTypes';

const initialState: MoviesState = {
  items: [
    {
      _id: "1",
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      genre: "Sci-Fi",
    },
    {
      _id: "2",
      title: "Interstellar",
      director: "Christopher Nolan",
      year: 2014,
      genre: "Sci-Fi",
    },
  ],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // TODO (exercise): add reducers here
    // e.g. setMovies, addMovie, removeMovie, updateMovie
  },
});

export const {} = moviesSlice.actions;
export default moviesSlice.reducer;
