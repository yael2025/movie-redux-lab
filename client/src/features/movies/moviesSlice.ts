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
    },
    removeMovie(state, action:PayloadAction<string>){
      state.items = state.items.filter(
        (movie)=>movie._id !== action.payload
      )
    },
    updateMovieInStore(state, action:PayloadAction<Movie>){
      const index = state.items.findIndex(
        (movie)=> movie._id === action.payload._id
      )

      if(index!== -1){
        state.items[index] = action.payload
      }
    },
    setLoading(state, action:PayloadAction<boolean>){
      state.loading = action.payload
    },
    setError(state, action:PayloadAction<string | null>){
      state.error = action.payload
    },
  },
});

export const {
  setMovies,
  addMovie,
  removeMovie,
  updateMovieInStore,
  setLoading,
  setError
} = moviesSlice.actions;

export default moviesSlice.reducer;

import type { RootState  } from "../../app/store";

export const selectMovies = (state:RootState)=> state.movies.items

export const selectMovieById = (id:string)=> (state: RootState)=>
  state.movies.items.find((m)=> m._id===id)

export const selectLoading = (state:RootState)=> state.movies.loading

export const selectError = (state: RootState)=> state.movies.error