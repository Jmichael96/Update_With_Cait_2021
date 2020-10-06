import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Routes from './components/Routing/Routes';

// redux
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';
import { setAlert } from './store/actions/alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(setAlert('Successfully made a message', 'success'))
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {/* <Switch> */}
        <Route component={Routes} />
        {/* </Switch> */}
      </Router>
    </Provider>
  );
}

export default App;
