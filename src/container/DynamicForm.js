import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchCities from '../Redux/actions/fetchCities';
import DynamicFormView from '../views/dynamicFormView'
import '../index.css';
import dynamicFormAction from '../Redux/actions/dynamicFormAction'
import ErrorPage from '../component/ErrorPage';

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
    }
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
    requestMoreTrip[tripIndex][name] = value
    this.setState({ requestMoreTrip });
  }

  onHandleSubmit = async () => {
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
      defaultStateValue: this.state.defaultStateValue
    };
  }

  componentDidMount() {
    const { allCities } = this.props;
    allCities();
  }

  render() {
    const { requestMoreTrip } = this.state;
    return (
      <>
        <div className="form-container">
          <ErrorPage />
          { requestMoreTrip.map((item, index) => (
            <DynamicFormView key={index} tripAction={this.tripActionsProps(index)} />
            ))
          }
          <button onClick={this.onHandleAddMoreTrip} className="addInputButton">Add trip</button> <br />
          <button onClick={this.onHandleSubmit} className="submitInputButton">Submit request</button> <br />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    availableCities: state.fetchCitiesReducer.payload
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allCities: () => dispatch(fetchCities()),
    sendMultipleInputData: (data) => dispatch(dynamicFormAction(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);