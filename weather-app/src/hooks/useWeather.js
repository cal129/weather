import { useState } from "react";
import { fetchWeather } from "../api/weatherApi";

const RECENT_SEARCHES_KEY = "recentWeatherSearches";

function readRecentSearches() {
  try {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveRecentSearches(cities) {
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(cities));
  } catch {
    // Ignore storage errors so search still works.
  }
}

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState(readRecentSearches);

  function updateRecentSearches(city) {
    const normalizedCity = city.trim();
    if (!normalizedCity) {
      return;
    }

    setRecentSearches((prev) => {
      const next = [
        normalizedCity,
        ...prev.filter((item) => item.toLowerCase() !== normalizedCity.toLowerCase()),
      ].slice(0, 5);

      saveRecentSearches(next);
      return next;
    });
  }

  async function search(city) {
    try {
      setLoading(true);
      setError("");
      const result = await fetchWeather(city);
      setData(result);
      updateRecentSearches(city);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, search, recentSearches };
}
