function WeatherCard({ data }) {
  const { name, main, weather } = data;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <p className="temp">{Math.round(main.temp)}°C</p>
      <p className="condition">{weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;
