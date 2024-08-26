import React, { useState } from 'react';

function App() {
  const [state, setState] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const states = [
    "Delhi", "Mumbai", "Chennai", "Kolkata", "Bengaluru", "Hyderabad", "Ahmedabad", 
    "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", 
    "Bhopal", "Patna", "Ludhiana", "Agra", "Nashik", "Vadodara", "Faridabad", 
    "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", 
    "Amritsar", "Navi Mumbai", "Allahabad"
  ];

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/weather/${selectedState}`);
      
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Failed to fetch weather data. Please try again later.');
      }

      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON response, got something else');
      }

      // Parse the JSON data
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message || 'An unknown error occurred');
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      
      <div>
        <label>Select State: </label>
        <select value={state} onChange={handleStateChange}>
          {states.map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {weatherData && (
        <div>
          <h2>Weather in {state}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Chance of Rain: {weatherData.chanceOfRain}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
