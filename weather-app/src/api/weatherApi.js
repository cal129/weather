const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm with hail",
};

async function fetchJson(url) {
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }

  if (!response.ok) {
    throw new Error(`Unable to fetch weather data (${response.status}).`);
  }

  return response.json();
}

export async function fetchWeather(city) {
  const query = city.trim();

  if (!query) {
    throw new Error("Enter a city name.");
  }

  const geocodingParams = new URLSearchParams({
    name: query,
    count: "1",
    language: "en",
    format: "json",
  });
  const geocodingData = await fetchJson(`${GEOCODING_URL}?${geocodingParams.toString()}`);
  const location = geocodingData?.results?.[0];

  if (!location) {
    throw new Error("City not found. Try a different spelling.");
  }

  const forecastParams = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,weather_code",
    timezone: "auto",
  });
  const forecastData = await fetchJson(`${FORECAST_URL}?${forecastParams.toString()}`);

  const weatherCode = forecastData?.current?.weather_code;
  const temperature = forecastData?.current?.temperature_2m;

  return {
    name: location.name,
    main: {
      temp: temperature,
    },
    weather: [
      {
        description: WEATHER_CODES[weatherCode] || "Unknown conditions",
      },
    ],
  };
}
