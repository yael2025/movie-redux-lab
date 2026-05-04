# Teacher Notes

## What is intentionally missing

- `moviesSlice.ts` has **no reducers** and **no thunks**. Only `initialState` and the slice skeleton.
- `MoviesPage.tsx` does **not** use `useSelector` or `useDispatch`. The `movies`, `loading`, and `error` values are hardcoded; the handlers are no-op stubs.
- No component imports `moviesApi`. The API layer is written and ready, but unused.
- No typed hooks (`useAppDispatch`, `useAppSelector`) yet — students add them in a later exercise.
- No selectors exported from the slice.

## What already works

- Backend: full CRUD on `/api/movies` against MongoDB.
- Frontend: form, list, edit/delete buttons, styling, routing of UI state (which movie is being edited).
- Redux store is configured and the `<Provider>` wraps the app. The slice is registered.
- Vite dev proxy forwards `/api` → `http://localhost:4000`.

## Expected final behavior (after all exercises)

- Movies load from MongoDB on page mount via a `fetchMovies` thunk.
- Submitting the form dispatches `createMovie` (or `updateMovie` when editing).
- Delete dispatches `deleteMovie`.
- Loading and error states come from the store and reflect in the UI.
- No component talks to `moviesApi` directly — only thunks do.
- After a page refresh, the persisted data is still there.

## Setup

```bash
# server
cd server
cp .env.example .env
npm install
npm run dev

# client
cd client
npm install
npm run dev
```

Mongo must be running locally (or set `MONGO_URI` to a remote cluster).

## Teaching guidance

- **Run after every exercise.** Each step should produce a visible change in the UI.
- **Follow the data flow:** action → reducer → dispatch → selector → render. Repeat this phrase often.
- **Start fully synchronous** (Exercises 1–7). Don't introduce thunks until students are comfortable with reducers and selectors.
- **Introduce DevTools early** (Redux DevTools browser extension). Make students watch actions fire.
- **Type things explicitly** the first few times (`PayloadAction<Movie>`, `RootState`) before introducing the typed hooks shortcut.
- **Discuss why** components shouldn't call the API directly: testability, single source of truth, reusable logic.
- **Common mistakes to watch for:**
  - Mutating state outside Immer (e.g., reassigning `state.items` in a way that breaks reactivity — actually fine in RTK, but worth explaining).
  - Forgetting to export the action from `slice.actions`.
  - Forgetting to `dispatch(...)` (just calling the action creator).
  - Using `useSelector` without typing `RootState`.
- **Stretch ideas** (after Exercise 14):
  - Add a search/filter selector.
  - Add optimistic updates for delete.
  - Split the slice into entity adapter (`createEntityAdapter`).
  - Add RTK Query as an alternative to thunks.
