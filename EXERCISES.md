# Exercises

Work through these in order. Each step is small. Run the app between steps and verify the UI behavior.

---

## Exercise 1 — Display a hardcoded movie list

**Goal:** show movies on screen using Redux state.

1. In `moviesSlice.ts`, set `initialState.items` to an array with 2 sample movies.
2. In `MoviesPage.tsx`, replace `const movies: Movie[] = []` with a `useSelector` that reads `state.movies.items`.
3. Type the selector using `RootState`.
4. Verify the two movies render in the list.

---

## Exercise 2 — Add a `setMovies` reducer

**Goal:** populate the store from outside.

1. In `moviesSlice.ts`, add a reducer `setMovies(state, action: PayloadAction<Movie[]>)`.
2. Export it from `moviesSlice.actions`.
3. In `MoviesPage.tsx`, in a `useEffect` that runs once, dispatch `setMovies([...])` with 3 hardcoded movies.
4. Verify the list updates.

---

## Exercise 3 — Add a movie via Redux

**Goal:** wire the form to the store.

1. Add a reducer `addMovie(state, action: PayloadAction<Movie>)` that pushes into `state.items`.
2. In `MoviesPage.tsx`, in `handleSubmit`, when `id` is undefined, dispatch `addMovie` with a new movie object (generate a temporary `_id` with `crypto.randomUUID()`).
3. Submit the form and verify the new movie appears.

---

## Exercise 4 — Delete a movie via Redux

**Goal:** remove an item from state.

1. Add a reducer `removeMovie(state, action: PayloadAction<string>)` that filters `state.items` by `_id`.
2. In `MoviesPage.tsx`, in `handleDelete`, dispatch `removeMovie(id)`.
3. Click delete and verify the row disappears.

---

## Exercise 5 — Update a movie via Redux

**Goal:** edit an existing item.

1. Add a reducer `updateMovieInStore(state, action: PayloadAction<Movie>)` that replaces the matching item.
2. In `MoviesPage.tsx`, in `handleSubmit`, when `id` is defined, dispatch `updateMovieInStore({ ...draft, _id: id })`.
3. Edit a movie, save, and verify it updates in place.

---

## Exercise 6 — Typed hooks

**Goal:** stop repeating types in every component.

1. Create `src/app/hooks.ts`.
2. Export `useAppDispatch = () => useDispatch<AppDispatch>()`.
3. Export `useAppSelector: TypedUseSelectorHook<RootState> = useSelector`.
4. Replace `useDispatch`/`useSelector` in `MoviesPage.tsx` with the typed versions.

---

## Exercise 7 — Selectors

**Goal:** keep selection logic out of components.

1. In `moviesSlice.ts`, export `selectMovies = (state: RootState) => state.movies.items`.
2. Export `selectMovieById = (id: string) => (state: RootState) => state.movies.items.find(m => m._id === id)`.
3. Use `selectMovies` in `MoviesPage.tsx`.

---

## Exercise 8 — Loading & error reducers

**Goal:** prepare state for async work.

1. Add reducers `setLoading(state, action: PayloadAction<boolean>)` and `setError(state, action: PayloadAction<string | null>)`.
2. In `MoviesPage.tsx`, read `loading` and `error` from the store via selectors.
3. Verify the existing `Loading…` / error UI still renders.

---

## Exercise 9 — Fetch movies from the backend

**Goal:** load real data on mount.

1. In `MoviesPage.tsx`, in a `useEffect`, dispatch `setLoading(true)`.
2. Call `moviesApi.list()` and dispatch `setMovies(data)` on success.
3. On error, dispatch `setError(err.message)`.
4. Always dispatch `setLoading(false)` at the end.
5. Verify movies load from the server.

---

## Exercise 10 — Async thunk: `fetchMovies`

**Goal:** move the fetch logic into Redux.

1. In `moviesSlice.ts`, create `fetchMovies = createAsyncThunk('movies/fetch', () => moviesApi.list())`.
2. Handle `pending` / `fulfilled` / `rejected` in `extraReducers`.
3. Replace the `useEffect` logic in `MoviesPage.tsx` with `dispatch(fetchMovies())`.

---

## Exercise 11 — Async thunk: `createMovie`

**Goal:** persist new movies to the backend.

1. Create `createMovie = createAsyncThunk('movies/create', (draft: MovieDraft) => moviesApi.create(draft))`.
2. In `extraReducers`, on `fulfilled`, push the returned movie into `state.items`.
3. In `handleSubmit` (when adding), dispatch `createMovie(draft)`.
4. Add a movie and reload — it should still be there.

---

## Exercise 12 — Async thunk: `deleteMovie`

**Goal:** persist deletions.

1. Create `deleteMovie = createAsyncThunk('movies/delete', (id: string) => moviesApi.remove(id))`.
2. In `extraReducers`, on `fulfilled`, filter `state.items` by the returned `id`.
3. In `handleDelete`, dispatch `deleteMovie(id)`.

---

## Exercise 13 — Async thunk: `updateMovie`

**Goal:** persist updates.

1. Create `updateMovie = createAsyncThunk('movies/update', ({ id, draft }: { id: string; draft: MovieDraft }) => moviesApi.update(id, draft))`.
2. In `extraReducers`, on `fulfilled`, replace the matching item.
3. In `handleSubmit` (when editing), dispatch `updateMovie({ id, draft })`.

---

## Exercise 14 — Cleanup

**Goal:** remove dead code.

1. Remove the synchronous `addMovie` / `removeMovie` / `updateMovieInStore` reducers (the thunks replaced them).
2. Confirm the app still works end-to-end: add, edit, delete, reload.
