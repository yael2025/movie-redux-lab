import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/movies.routes';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/movies', moviesRouter);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error' });
  });

  return app;
}
