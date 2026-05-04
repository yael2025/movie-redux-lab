export interface Movie {
  _id: string;
  title: string;
  director: string;
  year: number;
  genre?: string;
}

export type MovieDraft = Omit<Movie, '_id'>;

export interface MoviesState {
  items: Movie[];
  loading: boolean;
  error: string | null;
}
