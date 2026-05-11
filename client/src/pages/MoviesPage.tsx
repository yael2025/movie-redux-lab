import { useState, useEffect } from 'react';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';
import type { Movie, MovieDraft } from '../features/movies/movieTypes';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  
  selectMovies,
  selectLoading,
  selectError,
  setLoading,
  setError,
  fetchMovies,
  createMovie,
  deleteMovie,
  updateMovie,
} from '../features/movies/moviesSlice';

import { moviesApi } from '../features/movies/moviesApi';
export default function MoviesPage() {
  const [editing, setEditing] = useState<Movie | null>(null);
  const dispatch = useAppDispatch();

  // TODO (exercise): read movies from the Redux store
  const movies= useAppSelector(selectMovies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  const loading = useAppSelector(selectLoading);
  const error  = useAppSelector(selectError)

  // TODO (exercise): replace stubs with Redux dispatches / thunks
  const handleSubmit = (draft: MovieDraft, id?: string) => {
    if (id) {
      dispatch(updateMovie({ id , draft }));
    } else {
      dispatch(createMovie(draft));
    }
  
    setEditing(null);
  };

  const handleEdit = (movie: Movie) => setEditing(movie);

  const handleDelete = (id: string) => {
    dispatch(deleteMovie(id));
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Movie Redux Lab</h1>
        <p>CRUD a movie collection — wire it up with Redux.</p>
      </header>

      <section className="layout">
        <MovieForm
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />

        <div className="list-panel">
          {loading && <p>Loading…</p>}
          {error && <p className="error">{error}</p>}
          <MovieList movies={movies} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </section>
    </div>
  );
}
