import React from 'react';

const WeatherCard = ({ weather }) => {
    return (
        <div>
            <h2>{weather.location}</h2>
            <p>{weather.temperature} °C</p>
            <p>{weather.description}</p>
        </div>
    );
};

export default WeatherCard;
