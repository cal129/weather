import { useState } from "react";
import { fetchWeather } from "../api/weatherApi";

export function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(city) {
    try {
      setLoading(true);
      setError("");
      const result = await fetchWeather(city);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, search };
}
