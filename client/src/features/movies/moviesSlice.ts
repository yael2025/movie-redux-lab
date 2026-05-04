import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie, MoviesState } from './movieTypes';

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
    setMovies(state, action: PayloadAction<Movie[]>){
      state.items = action.payload;
    },
    addMovie(state,action:PayloadAction<Movie>){
      state.items.push(action.payload);
    }
  },
});

export const {setMovies , addMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
