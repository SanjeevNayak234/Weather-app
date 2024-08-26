const express = require('express');
const router = express.Router();
const axios = require('axios');

// Example route to get weather data for a specific state
router.get('/:state', async (req, res) => {
    const { state } = req.params;

    try {
        const apiKey = 'YOUR_WEATHER_API_KEY';
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
            params: {
                key: apiKey,
                q: state
            }
        });

        // Log the response to check its structure
        console.log('Weather API response:', response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

module.exports = { weatherRouter: router };
