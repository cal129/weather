import { getWeatherLabel } from '../api/weatherApi';

function formatDay(dateString, timeZone) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone,
  }).format(new Date(dateString));
}

export function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  const { location, current, daily, condition } = weather;
  const headline = [location.name, location.admin1, location.country].filter(Boolean).join(', ');
  const forecastDays = daily?.time?.slice(0, 3) ?? [];

  return (
    <section className="weather-card">
      <div className="weather-card__hero">
        <div>
          <p className="weather-card__eyebrow">Current weather</p>
          <h2 className="weather-card__title">{headline}</h2>
          <p className="weather-card__condition">{condition ?? getWeatherLabel(current?.weather_code)}</p>
        </div>
        <div className="weather-card__temp-wrap">
          <span className="weather-card__temp">{Math.round(current.temperature_2m)}°</span>
          <span className="weather-card__feels-like">Feels like {Math.round(current.apparent_temperature)}°</span>
        </div>
      </div>

      <div className="weather-card__stats">
        <div className="weather-card__stat">
          <span className="weather-card__stat-label">Humidity</span>
          <span className="weather-card__stat-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="weather-card__stat">
          <span className="weather-card__stat-label">Wind</span>
          <span className="weather-card__stat-value">{Math.round(current.wind_speed_10m)} km/h</span>
        </div>
        <div className="weather-card__stat">
          <span className="weather-card__stat-label">Latitude</span>
          <span className="weather-card__stat-value">{location.latitude.toFixed(2)}</span>
        </div>
      </div>

      {forecastDays.length > 0 ? (
        <div className="weather-card__forecast">
          <h3 className="weather-card__forecast-title">Next days</h3>
          <ul className="forecast-list">
            {forecastDays.map((day, index) => (
              <li className="forecast-list__item" key={day}>
                <span className="forecast-list__day">{formatDay(day, location.timezone)}</span>
                <span className="forecast-list__temp">
                  {Math.round(daily.temperature_2m_max[index])}° / {Math.round(daily.temperature_2m_min[index])}°
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}