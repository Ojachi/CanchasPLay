import React from 'react';

const CustomTimePicker2 = ({ value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
      <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
      <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
      <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
      <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
      <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
      <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM</option>
      <option value="8:00 PM - 10:00 PM">8:00 PM - 10:00 PM</option>
    </select>
  );
};

export default CustomTimePicker2;