import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import auth from './auth';
import post from './post';
import saved from './saved';

const rootReducer = combineReducers({
    alert,
    modal,
    auth,
    post,
    saved
});

export default rootReducer;