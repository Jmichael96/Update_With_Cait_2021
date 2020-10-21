import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import auth from './auth';
import post from './post';
import saved from './saved';
import subscribe from './subscribe';

const rootReducer = combineReducers({
    alert,
    modal,
    auth,
    post,
    saved,
    subscribe
});

export default rootReducer;