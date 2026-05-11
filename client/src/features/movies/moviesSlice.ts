import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie, MovieDraft, MoviesState } from './movieTypes';
import { moviesApi } from './moviesApi';

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

export const fetchMovies = createAsyncThunk(
  'movie/fetch',
  async ()=>{
    return await moviesApi.list()
  }
)

export const createMovie = createAsyncThunk(
  'movie/create',
  async(draft:MovieDraft)=>{
    return await moviesApi.create(draft)
  }
)
export const deleteMovie = createAsyncThunk(
  'movie/delete',
  async(id:string)=>{
    return await moviesApi.remove(id);
  }
)
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
  extraReducers:(builder)=>{
    builder
    .addCase(fetchMovies.pending, (state)=>{
      state.loading= true;
      state.error = null
    })
    .addCase(fetchMovies.fulfilled,(state, action)=>{
      state.loading = false
      state.items = action.payload
    })
    .addCase(fetchMovies.rejected,(state, action)=>{
      state.loading = false
      state.error = action.error.message ?? 'Failed to fetch movies'
    })
    .addCase(createMovie.fulfilled,(state, action)=>{
      state.items.push(action.payload)
    })
    .addCase(deleteMovie.fulfilled,(state, action)=>{
      state.items = state.items.filter(
        (movie)=> movie._id !== action.payload.id
      )
    })
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