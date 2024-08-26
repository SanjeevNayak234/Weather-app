import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [state, setState] = useState('Mumbai');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');

  const states = [
    "Delhi", "Mumbai", "Chennai", "Kolkata", "Bengaluru", "Hyderabad", "Ahmedabad", 
    "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", 
    "Bhopal", "Patna", "Ludhiana", "Agra", "Nashik", "Vadodara", "Faridabad", 
    "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", 
    "Amritsar", "Navi Mumbai", "Allahabad"
  ];

  useEffect(() => {
    handleStateChange({ target: { value: state } });
  }, [state]);

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setError('');

    try {
      const currentResponse = await fetch(`http://localhost:5000/api/weather/${selectedState}`);
      if (!currentResponse.ok) throw new Error('Failed to fetch weather data.');
      const currentData = await currentResponse.json();
      setWeatherData(currentData);

      const forecastResponse = await fetch(`http://localhost:5000/api/weather/${selectedState}/tomorrow`);
      if (!forecastResponse.ok) throw new Error('Failed to fetch tomorrow\'s weather data.');
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message || 'An unknown error occurred');
      setWeatherData(null);
      setForecastData(null);
    }
  };

  return (
    <div className="app-container">
      <div className="main-box">
        <h1>Weather App</h1>
        <div>
          <label>Select State: </label>
          <select value={state} onChange={handleStateChange} className="state-select">
            {states.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
        </div>

        <div className="weather-info">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {weatherData && (
            <>
              <h2>Current Weather in {state}</h2>
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Chance of Rain: {weatherData.chanceOfRain}%</p>
            </>
          )}
        </div>

        <div className="forecast-info">
          {forecastData && (
            <>
              <h2>Weather Forecast</h2>
              <p>Temperature for Tomorrow: {forecastData.temperature}°C</p>
              <p>Chance of Rain for Tomorrow: {forecastData.chanceOfRain}%</p>
            </>
          )}
          {!forecastData && <p>Failed to fetch tomorrow's weather data.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
