# Movie Redux Lab

Teaching project for a React + Redux course. The backend and UI are complete; the Redux layer is intentionally a skeleton. Students wire it up through the steps in `EXERCISES.md`.

## Stack

- **Frontend:** React + TypeScript + Vite, Redux Toolkit, Axios
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose

## Run

```bash
# backend
cd server
cp .env.example .env
npm install
npm run dev          # http://localhost:4000

# frontend (in a new terminal)
cd client
npm install
npm run dev          # http://localhost:5173
```

MongoDB must be running locally (default URI: `mongodb://127.0.0.1:27017/movie-redux-lab`).

## Files

- `EXERCISES.md` — step-by-step student exercises
- `TEACHER_NOTES.md` — what's missing, expected behavior, teaching tips
