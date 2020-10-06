import { combineReducers } from 'redux';
import alert from './alert';
import modal from './modal';
import auth from './auth';

const rootReducer = combineReducers({
    alert,
    modal,
    auth
});

export default rootReducer;