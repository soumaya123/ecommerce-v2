import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "../../store/store";
import Homepage from '../HomePage'

const AllRoute = () => {

  return (
    <React.StrictMode>
       <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/home' component={Homepage} />
            <Route path='/*' component={Homepage} />
          </Switch>
        </Router>
      </div>
      </Provider>
    </React.StrictMode>
  );
}

export default AllRoute;