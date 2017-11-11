import {combineReducers} from 'redux';

import categories from './categories.js';
import expenses from './expenses.js';

export default combineReducers({
  categories,
  expenses,
});
