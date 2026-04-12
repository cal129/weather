import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";
import "./styles/App.css";
import "./styles/Weather.css";

function App() {
  const { data, loading, error, search, recentSearches, clearRecentSearches } = useWeather();

  return (
    <div className="app">
      <h1>Weather App</h1>

      <SearchBar
        onSearch={search}
        recentSearches={recentSearches}
        onClearRecent={clearRecentSearches}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && <WeatherCard data={data} />}
    </div>
  );
}

export default App;
