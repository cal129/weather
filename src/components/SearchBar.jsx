export function SearchBar({ query, loading, onQueryChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(query);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="search-bar__label" htmlFor="city-search">
        Search a city
      </label>
      <div className="search-bar__controls">
        <input
          id="city-search"
          className="search-bar__input"
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try Paris, Tokyo, or Cape Town"
          autoComplete="off"
          spellCheck="false"
        />
        <button className="search-bar__button" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
    </form>
  );
}