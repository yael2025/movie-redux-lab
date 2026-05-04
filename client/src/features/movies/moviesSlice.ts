import { createSlice } from '@reduxjs/toolkit';
import type { MoviesState } from './movieTypes';

const initialState: MoviesState = {
  items: [],
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
