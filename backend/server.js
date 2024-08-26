const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;
const API_KEY = 'f74e36b60c7d4f528896f08bebb11fc1';

app.use(cors());

app.get('/api/weather/:state/:date?', async (req, res) => {
  const { state, date } = req.params;
  let url = `https://api.weatherbit.io/v2.0/current?city=${state}&key=${API_KEY}`;

  // Modify URL for forecast or historical data
  if (date) {
    if (date === 'yesterday') {
      url = `https://api.weatherbit.io/v2.0/history/daily?city=${state}&start_date=${getYesterdayDate()}&end_date=${getYesterdayDate()}&key=${API_KEY}`;
    } else if (date === 'tomorrow') {
      url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${state}&key=${API_KEY}`;
    }
  }

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    // Process weather data based on the endpoint
    let result;
    if (date === 'yesterday') {
      result = {
        temperature: weatherData.data[0].temp,
        chanceOfRain: weatherData.data[0].precip
      };
    } else if (date === 'tomorrow') {
      result = {
        temperature: weatherData.data[1].temp,
        chanceOfRain: weatherData.data[1].precip
      };
    } else {
      result = {
        temperature: weatherData.data[0].temp,
        chanceOfRain: weatherData.data[0].precip
      };
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

function getYesterdayDate() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
