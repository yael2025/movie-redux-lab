import { useEffect, useState } from 'react';
import type { Movie, MovieDraft } from '../features/movies/movieTypes';

interface MovieFormProps {
  editing: Movie | null;
  onSubmit: (draft: MovieDraft, id?: string) => void;
  onCancel: () => void;
}

const empty: MovieDraft = { title: '', director: '', year: new Date().getFullYear(), genre: '' };

export default function MovieForm({ editing, onSubmit, onCancel }: MovieFormProps) {
  const [draft, setDraft] = useState<MovieDraft>(empty);

  useEffect(() => {
    if (editing) {
      const { _id, ...rest } = editing;
      setDraft(rest);
    } else {
      setDraft(empty);
    }
  }, [editing]);

  const handleChange = (field: keyof MovieDraft, value: string) => {
    setDraft((prev) => ({
      ...prev,
      [field]: field === 'year' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.director.trim()) return;
    onSubmit(draft, editing?._id);
    setDraft(empty);
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>{editing ? 'Edit movie' : 'Add movie'}</h2>

      <input
        placeholder="Title"
        value={draft.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      <input
        placeholder="Director"
        value={draft.director}
        onChange={(e) => handleChange('director', e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={draft.year}
        onChange={(e) => handleChange('year', e.target.value)}
      />
      <input
        placeholder="Genre"
        value={draft.genre ?? ''}
        onChange={(e) => handleChange('genre', e.target.value)}
      />

      <div className="form-actions">
        <button type="submit">{editing ? 'Save' : 'Add'}</button>
        {editing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
