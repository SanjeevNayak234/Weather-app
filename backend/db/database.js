const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/weather.db'); // Adjust the path if necessary

function getWeatherForState(state, callback) {
  const query = 'SELECT temperature, chanceOfRain FROM weather WHERE state = ?';

  db.get(query, [state], (err, row) => {
    if (err) {
      console.error('Error querying database:', err); // Log database errors
      return callback(err);
    }
    if (!row) {
      console.log('No data found for state:', state); // Log if no data found
      return callback(null, null);
    }
    callback(null, row);
  });
}

module.exports = { getWeatherForState };
