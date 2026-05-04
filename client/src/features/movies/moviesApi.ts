import axios from 'axios';
import type { Movie, MovieDraft } from './movieTypes';

const api = axios.create({ baseURL: '/api' });

export const moviesApi = {
  list: async (): Promise<Movie[]> => {
    const { data } = await api.get<Movie[]>('/movies');
    return data;
  },
  create: async (draft: MovieDraft): Promise<Movie> => {
    const { data } = await api.post<Movie>('/movies', draft);
    return data;
  },
  update: async (id: string, draft: MovieDraft): Promise<Movie> => {
    const { data } = await api.put<Movie>(`/movies/${id}`, draft);
    return data;
  },
  remove: async (id: string): Promise<{ id: string }> => {
    const { data } = await api.delete<{ id: string }>(`/movies/${id}`);
    return data;
  },
};
