//! ALERT TYPES 
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

//! CONFIRM MODAL TYPES 
export const SET_MODAL = 'SET_MODAL';
export const REMOVE_MODAL = 'REMOVE_MODAL';

//! AUTH TYPES
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGOUT = 'LOGOUT';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

//! POST TYPES
export const POST_ERROR = 'POST_ERROR';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_LIFESTYLE = 'FETCH_LIFESTYLE';
export const FETCH_DEVOTIONAL = 'FETCH_DEVOTIONAL';
export const FETCH_WELLNESS = 'FETCH_WELLNESS';
export const FETCH_GRAPHICS = 'FETCH_GRAPHICS';

//! SAVED POST TYPES
export const SAVE_ERROR = 'SAVE_ERROR';
export const SAVE_POST = 'SAVE_POST';
export const FETCH_SAVED = 'FETCH_SAVED';
export const DELETE_SAVED = 'DELETE_SAVED';
export const FETCH_SAVED_POST = 'FETCH_SAVED_POST';
export const RESAVE_POST = 'RESAVE_POST';
// this one is for removing from the saved reducer
export const PUBLISH_SAVED_POST_REMOVE = 'PUBLISH_SAVED_POST_REMOVE';
// this one is for adding to the post reducer
export const PUBLISH_SAVED_POST_ADD = 'PUBLISH_SAVED_POST_ADD';