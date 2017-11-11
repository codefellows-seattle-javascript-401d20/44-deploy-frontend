
import {combineReducers} from 'redux';
import token from './token.js';
import clientProfile from './client-profile.js';
import clientPhoto from './client-photo.js';
export default combineReducers({token, clientProfile, clientPhoto});
