import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { useWeather } from './hooks/useWeather';

import './styles/App.css';
import './styles/Weather.css';

export default function App() {
  const { query, setQuery, weather, loading, error, searchWeather } = useWeather('London');

  return (
    <main className="app-shell">
      <div className="app-shell__content">
        <section className="app-shell__hero">
          <p className="app-shell__eyebrow">Weather forecast</p>
          <h1 className="app-shell__title">A clear, fast weather view for any city.</h1>
          <p className="app-shell__subtitle">
            Search a location to see current conditions and a short forecast in a layout designed to stay readable on
            desktop and mobile.
          </p>
        </section>

        <SearchBar query={query} loading={loading} onQueryChange={setQuery} onSubmit={searchWeather} />

        <p className="app-shell__status" aria-live="polite">
          {error}
        </p>

        {weather ? <WeatherCard weather={weather} /> : null}
      </div>
    </main>
  );
}