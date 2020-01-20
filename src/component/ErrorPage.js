import React from 'react'
import '../index.css';

const ErrorPage = (props) => {
  const { onHandleHideErrors, showErrors, errors } = props.tripAction;
  let errorClass = 'container-error-page form-message-container close';
  if (errors) {
    errorClass = 'container-error-page form-message-container';
  }
  return (
    <div className={errorClass}>
      {/* <span onClick={ onHandleHideErrors } className="remove-message">X</span> */}
      <h3 className="message-title">OOPS! There is a problem :(</h3>
      <p className="message-details">Check if trip origin and destination is provided</p>
      <p className="message-details">Check if trip are not the same or already chosen</p>
      <p className="message-details">Check that date is valid and not chosen before</p>
      <p className="message-details">You can not create similar trip or or passed date</p>
      <p className="message-details">You can not create multiple trips of the same trip </p>
    </div>
  );
};

export default ErrorPage;
