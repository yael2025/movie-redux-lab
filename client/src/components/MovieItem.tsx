import type { Movie } from '../features/movies/movieTypes';

interface MovieItemProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export default function MovieItem({ movie, onEdit, onDelete }: MovieItemProps) {
  return (
    <li className="movie-item">
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          {movie.director} · {movie.year}
          {movie.genre ? ` · ${movie.genre}` : ''}
        </p>
      </div>
      <div className="movie-actions">
        <button onClick={() => onEdit(movie)}>Edit</button>
        <button onClick={() => onDelete(movie._id)} className="danger">
          Delete
        </button>
      </div>
    </li>
  );
}
