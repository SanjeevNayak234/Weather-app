const db = require('../db/database').connectDB();

const getWeatherByLocation = (location, callback) => {
    db.get('SELECT * FROM weather_data WHERE location = ?', [location], (err, row) => {
        callback(err, row);
    });
};

const saveWeatherData = (location, temperature, description, callback) => {
    db.run('INSERT INTO weather_data (location, temperature, description) VALUES (?, ?, ?)', [location, temperature, description], function(err) {
        callback(err, this.lastID);
    });
};

module.exports = { getWeatherByLocation, saveWeatherData };
