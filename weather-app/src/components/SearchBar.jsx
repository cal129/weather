import { useState } from "react";

function SearchBar({ onSearch, recentSearches = [] }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  }

  return (
    <>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <p className="recent-searches__label">Recent:</p>
          <div className="recent-searches__list">
            {recentSearches.map((recentCity) => (
              <button
                key={recentCity.toLowerCase()}
                type="button"
                className="recent-searches__item"
                onClick={() => onSearch(recentCity)}
              >
                {recentCity}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBar;
