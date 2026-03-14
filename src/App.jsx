import React, { useReducer, useCallback, useMemo, useState } from "react";
import Gallery from "./components/Gallery.jsx";
import { favouritesReducer, initialFavouritesState } from "./reducers/favouritesReducer.js";

const FAV_KEY = "celebrare_favourites";

function getInitialFavourites() {
  try {
    const stored = localStorage.getItem(FAV_KEY);
    if (!stored) return initialFavouritesState;
    return JSON.parse(stored);
  } catch (e) {
    return initialFavouritesState;
  }
}

function App() {
  const [state, dispatch] = useReducer(favouritesReducer, undefined, getInitialFavourites);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleFavourite = useCallback(
    (photo) => {
      dispatch({ type: "TOGGLE_FAVOURITE", payload: photo });
    },
    [dispatch]
  );

  React.useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(state));
  }, [state]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const [showFavourites, setShowFavourites] = useState(false);

  const favouriteIds = useMemo(
    () => new Set(state.favourites.map((p) => p.id)),
    [state.favourites]
  );

  return (
    <div className="app-shell">
      <header className="header">
        <div className="hero-row">
          <div>
            <h1 className="hero-title">Celebrare Photo Gallery</h1>
            <p className="hero-sub">Explore photos, search by author, and save favourites.</p>
          </div>
          <div className="header-controls">
            <button type="button" onClick={() => setShowFavourites((prev) => !prev)} className={showFavourites ? "btn-primary" : "btn-secondary"}>
              {showFavourites ? "Show All" : "Show Favourite"}
            </button>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by author name..." className="search-input" />
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Gallery searchTerm={searchTerm} onToggleFavourite={handleToggleFavourite} favouriteIds={favouriteIds} showFavourites={showFavourites} />
      </main>
    </div>
  );
}

export default App;

