import React from 'react';
import PropTypes from 'prop-types';

const WeatherDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="weather-display">
      <h2>Weather Report</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Chance of Rain: {data.chanceOfRain}%</p>
    </div>
  );
};

WeatherDisplay.propTypes = {
  data: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    chanceOfRain: PropTypes.number.isRequired
  }).isRequired
};

export default WeatherDisplay;
