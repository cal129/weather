import { useEffect, useState } from 'react';

import { fetchWeather } from '../api/weatherApi';

export function useWeather(initialCity = 'London') {
  const [query, setQuery] = useState(initialCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchWeather(city = query) {
    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError('Enter a city name to search.');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const nextWeather = await fetchWeather(trimmedCity);
      setWeather(nextWeather);
      setQuery(trimmedCity);
    } catch (searchError) {
      setWeather(null);
      setError(searchError instanceof Error ? searchError.message : 'Something went wrong while loading weather.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void searchWeather(initialCity);
  }, []);

  return {
    query,
    setQuery,
    weather,
    loading,
    error,
    searchWeather,
  };
}