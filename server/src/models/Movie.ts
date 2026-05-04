import { Schema, model, InferSchemaType } from 'mongoose';

const movieSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    genre: { type: String, default: '' },
  },
  { timestamps: true }
);

export type MovieDoc = InferSchemaType<typeof movieSchema> & { _id: string };

export const Movie = model('Movie', movieSchema);
