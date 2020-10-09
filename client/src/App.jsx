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

if (localStorage.token) {
  setAuthToken(localStorage.token);

};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
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
