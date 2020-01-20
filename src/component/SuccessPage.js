import React from 'react'
import '../index.css';

const SuccessPage = (props) => {
  const { onHandleHideTips } = props.tripAction;
  return (
    <div className="container-success-page form-message-container">
      <span onClick={ onHandleHideTips } className="remove-message">X</span>
      <h3 className="message-title"> You are about to send multi trip ensure the following :)</h3>
      <p className="message-details">You must provide origin and destination</p>
      <p className="message-details">Tell us the reason</p>
      <p className="message-details">you must provide start date and return date</p>
      <p className="message-details">choose valid date</p>
      <p className="message-details">Ensure date are not taken and different</p>
      <p className="message-details">Ensure origin and destination are not the same</p>
    </div>
  );
};

export default SuccessPage;
