import React from 'react';
import PropTypes from 'prop-types';
import './StateSelector.css'; // Import the CSS file for styling

// List of Indian states
const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Lakshadweep'
];

// StateSelector component
const StateSelector = ({ selectedState, onStateChange }) => {
  return (
    <div className="state-selector">
      <label htmlFor="state">Select a State:</label>
      <select
        id="state"
        value={selectedState}
        onChange={(e) => onStateChange(e.target.value)}
      >
        <option value="">-- Select State --</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

// PropTypes validation
StateSelector.propTypes = {
  selectedState: PropTypes.string.isRequired,
  onStateChange: PropTypes.func.isRequired,
};

// Default props
StateSelector.defaultProps = {
  onStateChange: () => {}, // No-op function as default
};

export default StateSelector;
