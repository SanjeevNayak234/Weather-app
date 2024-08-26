// frontend/src/components/WeatherReport.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherReport = ({ selectedState }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:5000/api/weather/${selectedState}`)
        .then(response => {
          setWeatherData(response.data);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setError('Failed to fetch weather data.');
        });
    }
  }, [selectedState]);

  return (
    <div>
      <h1>Today's Weather</h1>
      {error && <p>{error}</p>}
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Chance of Rain: {weatherData.chanceOfRain}%</p>
        </div>
      ) : (
        <p>Select a state to view the weather.</p>
      )}
    </div>
  );
};

export default WeatherReport;
