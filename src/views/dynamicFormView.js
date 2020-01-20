import React from 'react';
import '../index.css';

const dynamicFormView = (props) => {
  const { cities, removeTrip, tripIndex, onHandleInputChange } = props.tripAction;
  
  return (
    <div className="one-request">
      <label>
        city
        <select
          onChange={(e) => onHandleInputChange(e, tripIndex)}
          name="originId"
          defaultValue="Choose-origin"
          required
        >
          <option
            value="Choose-origin"
            disabled
          >Choose origin</option>
          { cities && cities.map((item, index) => (
            <option value={item.id} key={index}>{item.city}</option>
            ))
          }
        </select>
        <select
          onChange={(e) => onHandleInputChange(e, tripIndex)}
          name="destinationId"
          required
          defaultValue="Choose-destination"
          required
        >
        <option 
          value="Choose-destination"
          disabled
        >Choose destination</option>
        { cities && cities.map((item, index) => (
          <option value={item.id} key={index}> {item.city}</option>
          ))
        }
        </select>
      </label> <br />

      <label>
        Reason:
        <textarea 
          name="reason"
          required
          onChange={(e) => onHandleInputChange(e, tripIndex)}
          required
        />
      </label> <br />

      <label>
        Start date:
        <input type="date"
          required
          id="start" 
          name="startDate" 
          min="2020-01-01" 
          max="2023-01-01" 
          onChange={(e) => onHandleInputChange(e, tripIndex)}
          required
        />
        <input type="date"
          required
          id="start"
          name="returnDate"
          min="2020-01-01"
          max="2023-01-01"
          onChange={(e) => onHandleInputChange(e, tripIndex)}
          required
        />
      </label> <br />
      <button onClick={() => removeTrip(tripIndex)} type="button" className="removeInputButton">Remove trip</button> <br />
    </div>
  );
};
export default dynamicFormView;
