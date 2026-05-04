import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

export async function listMovies(_req: Request, res: Response) {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json(movies);
}

export async function getMovie(req: Request, res: Response) {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
}

export async function createMovie(req: Request, res: Response) {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
}

export async function updateMovie(req: Request, res: Response) {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
}

export async function deleteMovie(req: Request, res: Response) {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json({ id: req.params.id });
}
