import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import auth from './auth';
import post from './post';

const rootReducer = combineReducers({
    alert,
    modal,
    auth,
    post
});

export default rootReducer;