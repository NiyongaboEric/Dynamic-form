import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCities from '../Redux/actions/fetchCities';
import DynamicFormView from '../views/dynamicFormView'
import '../index.css';
import dynamicFormAction from '../Redux/actions/dynamicFormAction'
import ErrorPage from '../component/ErrorPage';
import SuccessPage from '../component/SuccessPage';

export class DynamicForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestMoreTrip: [
        {
          originId: '',
          destinationId: '',
          startDate: '',
          returnDate: '',
          reason: '',
        },
      ],
      showTips: true,
      showErrors: true,
    }
  }

  componentDidMount() {
    const { allCities } = this.props;
    allCities();
  }

  onHandleAddMoreTrip = () => {
    const { requestMoreTrip } = this.state;
    this.setState({ requestMoreTrip: 
      [
        ...requestMoreTrip, 
        {
          originId: '',
          destinationId: '',
          startDate: '',
          returnDate: '',
          reason: '',
        }
      ]
    });
  }

  onHandleRemoveMoreTrip = (item) => {
    const { requestMoreTrip } = this.state
    const tripRequestInfo = [...requestMoreTrip];
    tripRequestInfo.splice(item, 1);
    this.setState({ requestMoreTrip: tripRequestInfo });
  }

  onHandleInputChange = (e, tripIndex) => {
    const requestMoreTrip = [...this.state.requestMoreTrip];
    const { name, value } = e.target;
    requestMoreTrip[tripIndex][name] = value;
    this.setState({ requestMoreTrip });
  }

  onHandleSubmit = async (event) => {
    event.preventDefault();
    const { sendMultipleInputData } = this.props;
    const { requestMoreTrip } = this.state
    await sendMultipleInputData(requestMoreTrip);
  }

  tripActionsProps = (index) => {
    return {
      tripIndex: index,
      removeInput: this.onHandleRemoveMoreTrip,
      onHandleInputChange: this.onHandleInputChange,
      cities: this.props.availableCities,
      removeTrip: this.onHandleRemoveMoreTrip,
      onHandleHideErrors: this.onHandleHideErrors,
      onHandleHideTips: this.onHandleHideTips,
      errors: this.props.errors,
      defaultStateValue: this.state.defaultStateValue,
      showErrors: this.state.showErrors
    };
  }

  onHandleHideErrors = () => {
    this.setState((prevState) => ({
      showErrors: !prevState.showErrors,
    }));
  }

  onHandleHideTips = () => {
    this.setState({ showTips: false });
  }

  render() {
    const { requestMoreTrip } = this.state;
    return (
      <>
        <div className="form-container">
          { this.state.showErrors && <ErrorPage tripAction={this.tripActionsProps(0)} /> }
          <form onSubmit={this.onHandleSubmit}>
            { requestMoreTrip.map((item, index) => (
              <DynamicFormView key={index} tripAction={this.tripActionsProps(index)} />
              ))
            }
            <button onClick={this.onHandleAddMoreTrip} type="button" className="addInputButton">Add trip</button> <br />
            <input type="submit" className="submitInputButton" value="Submit request" /> <br />
          </form>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    availableCities: state.fetchCitiesReducer.payload,
    errors: state.dynamicFormAction.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allCities: () => dispatch(fetchCities()),
    sendMultipleInputData: (data) => dispatch(dynamicFormAction(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);