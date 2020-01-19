import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import store from './Redux/store/store';
import DynamicForm from './container/DynamicForm';


const Routers = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={DynamicForm} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default Routers;
