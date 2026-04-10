const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

const WEATHER_LABELS = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

async function fetchJson(url, errorMessage) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${errorMessage} (${response.status})`);
  }

  return response.json();
}

export function getWeatherLabel(weatherCode) {
  return WEATHER_LABELS[weatherCode] ?? 'Unknown conditions';
}

export async function fetchWeather(cityName) {
  const trimmedCityName = cityName.trim();

  if (!trimmedCityName) {
    throw new Error('Enter a city name to search for weather.');
  }

  const geocodingUrl = new URL(GEOCODING_API_URL);
  geocodingUrl.searchParams.set('name', trimmedCityName);
  geocodingUrl.searchParams.set('count', '1');
  geocodingUrl.searchParams.set('language', 'en');
  geocodingUrl.searchParams.set('format', 'json');

  const geocodingData = await fetchJson(geocodingUrl, 'Unable to find that location');
  const location = geocodingData.results?.[0];

  if (!location) {
    throw new Error(`No weather location found for "${trimmedCityName}".`);
  }

  const weatherUrl = new URL(WEATHER_API_URL);
  weatherUrl.searchParams.set('latitude', String(location.latitude));
  weatherUrl.searchParams.set('longitude', String(location.longitude));
  weatherUrl.searchParams.set('current', 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code');
  weatherUrl.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min');
  weatherUrl.searchParams.set('timezone', 'auto');

  const weatherData = await fetchJson(weatherUrl, 'Unable to load weather data');

  return {
    location: {
      name: location.name,
      admin1: location.admin1,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: weatherData.timezone,
    },
    current: weatherData.current,
    daily: weatherData.daily,
    condition: getWeatherLabel(weatherData.current?.weather_code),
  };
}