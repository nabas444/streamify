
# CineStream

A Netflix-style movie discovery web app built with React and the TMDB API. Browse trending, popular, and top-rated movies, explore by genre, watch trailers, search the full TMDB catalog, and save titles to a personal watchlist.

**Live demo:** https://filmstudo.vercel.app/

## Features

- **Home feed** — Hero banner plus horizontally scrolling rows for Trending, Now Playing, Popular, Top Rated, and genre-based rows (Action, Comedy, Horror, Romance, Animation)
- **Movie details** — Cast, videos, similar titles, and images via TMDB's `append_to_response`
- **Trailers** — In-app modal video player
- **Search** — Debounced search against the TMDB catalog
- **Genre browsing** — Dedicated genre pages with infinite scroll
- **Watchlist** — Add/remove movies, persisted to `localStorage`
- **Routing** — Client-side routing with lazy-loaded, code-split pages
- **Responsive UI** — Built with plain CSS modules per component

## Tech Stack

- [React 18](https://react.dev/) + [React Router 6](https://reactrouter.com/)
- [Vite 5](https://vitejs.dev/) (build tool, `@vitejs/plugin-react-swc`)
- [Axios](https://axios-http.com/) for HTTP requests
- [Recharts](https://recharts.org/) for data visualization
- [TMDB API](https://developer.themoviedb.org/docs) as the movie data source
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for testing
- [ESLint](https://eslint.org/) for linting

## Getting Started

### Prerequisites

- Node.js 18+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/<your-username>/streamify.git
cd streamify
npm install
```

### Environment Variables

Copy the example env file and add your TMDB API key:

```bash
cp .env.example .env
```

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Scripts

| Command | Description |
|---|---|
| `npm run build` | Production build |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Footer, HeroBanner, MovieCard, MovieRow, TrailerModal, ScrollToTop)
├── context/           # Global state (MovieContext: watchlist, search, genre)
├── hooks/             # Custom hooks (useFetch, useDebounce, useInfiniteScroll, useWatchlist)
├── pages/             # Route-level pages (Home, MovieDetails, Search, Genre, Watchlist, NotFound)
├── services/          # TMDB API client (api.js)
├── styles/            # Global styles
└── test/              # Test setup and example tests
```

## Deployment

The project is configured for [Vercel](https://vercel.com/) with an SPA rewrite rule (`vercel.json`) so all routes fall back to `index.html`. Remember to set `VITE_TMDB_API_KEY` in your deployment environment's settings.

## License

Licensed under the [MIT License](./LICENSE).
