const API_KEY = "7be4d792f01b253d070a001a8c517536";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}
