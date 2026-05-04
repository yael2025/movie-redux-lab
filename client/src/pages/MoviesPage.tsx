import { useState } from 'react';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';
import type { Movie, MovieDraft } from '../features/movies/movieTypes';
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

export default function MoviesPage() {
  const [editing, setEditing] = useState<Movie | null>(null);

  // TODO (exercise): read movies from the Redux store
  const movies= useSelector((state:RootState)=> state.movies.items);
  const loading = false;
  const error: string | null = null;

  // TODO (exercise): replace stubs with Redux dispatches / thunks
  const handleSubmit = (_draft: MovieDraft, _id?: string) => {
    setEditing(null);
  };

  const handleEdit = (movie: Movie) => setEditing(movie);

  const handleDelete = (_id: string) => {};

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
