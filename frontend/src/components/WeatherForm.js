import React, { useState } from 'react';
import { fetchWeather, saveWeather } from '../api';

const WeatherForm = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetchWeather(location);
        setWeather(data);
        await saveWeather(data); // Save weather data to the database
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            <button type="submit">Get Weather</button>
            {weather && (
                <div>
                    <h2>{weather.location}</h2>
                    <p>{weather.temperature} °C</p>
                    <p>{weather.description}</p>
                </div>
            )}
        </form>
    );
};

export default WeatherForm;
