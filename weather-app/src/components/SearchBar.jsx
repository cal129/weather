import { useState } from "react";

function SearchBar({ onSearch, recentSearches = [] }) {
  const [city, setCity] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const query = city.trim();
    if (!query) {
      return;
    }

    const success = await onSearch(query);
    if (success) {
      setCity("");
    }
  }

  async function handleRecentClick(recentCity) {
    setCity(recentCity);
    await onSearch(recentCity);
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
                onClick={() => handleRecentClick(recentCity)}
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
