import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Routes from './components/Routing/Routes';

// redux
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';
import { fetchDevotional, fetchGraphics, fetchLifestyle, fetchWellness } from './store/actions/post';
import { setAlert } from './store/actions/alert';

if (localStorage.token) {
  setAuthToken(localStorage.token);

};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(setAlert('this is a message!', 'success'));
    // store.dispatch(fetchDevotional());
    // store.dispatch(fetchGraphics());
    // store.dispatch(fetchLifestyle());
    // store.dispatch(fetchWellness());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route component={Routes} />
      </Router>
    </Provider>
  );
}

export default App;
