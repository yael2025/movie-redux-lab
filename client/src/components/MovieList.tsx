import type { Movie } from '../features/movies/movieTypes';
import MovieItem from './MovieItem';

interface MovieListProps {
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export default function MovieList({ movies, onEdit, onDelete }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="empty">No movies yet.</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieItem
          key={movie._id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
