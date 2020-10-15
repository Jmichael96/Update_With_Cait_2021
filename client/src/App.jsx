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
import { setModal } from './store/actions/modal';

if (localStorage.token) {
  setAuthToken(localStorage.token);

};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(setModal('error', 'title', 'this is the modal text and it can be kind of long! it is time to get even longer hahah ha ha h aha h ahjld lkfjl', 'okay', () => { }));
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
